// TypedMind Language Support for Monaco Editor (Standalone version)
// Based on VSCode extension syntax highlighting

function registerTypedMindLanguage(monaco) {
  // Register the language
  monaco.languages.register({ 
    id: 'typedmind',
    extensions: ['.tmd'],
    aliases: ['TypedMind', 'typedmind', 'TMD'],
    mimetypes: ['text/x-typedmind']
  });

  // Set language configuration
  monaco.languages.setLanguageConfiguration('typedmind', {
    comments: {
      lineComment: '#'
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: '<', close: '>' }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: '<', close: '>' }
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*(program|file|class|function|dto|component|constants|asset)\\s+\\w+\\s*\\{"),
        end: new RegExp("^\\s*\\}")
      }
    },
    onEnterRules: [
      {
        beforeText: /{\s*$/,
        afterText: /^\s*}/,
        action: { indentAction: monaco.languages.IndentAction.IndentOutdent }
      }
    ]
  });

  // Define monarch tokenizer (based on VSCode tmLanguage)
  monaco.languages.setMonarchTokensProvider('typedmind', {
    defaultToken: '',
    
    keywords: [
      'program', 'file', 'function', 'class', 'dto', 'constants', 
      'asset', 'component', 'runParameter', 'dependency',
      'entryPoint', 'version', 'path', 'imports', 'exports',
      'signature', 'description', 'input', 'output', 'calls',
      'affects', 'consumes', 'extends', 'methods', 'fields',
      'name', 'type', 'optional', 'root', 'contains', 'containedBy',
      'schema', 'mimeTypes', 'sourceFile', 'targetFile',
      'true', 'false'
    ],
    
    typeKeywords: [
      'string', 'number', 'boolean', 'Date', 'any', 'void',
      'object', 'array', 'null', 'undefined'
    ],
    
    operators: [
      '->', '@', '::', '<:', '%', '!', '&', '&!', '~', '~>',
      '<-', '->', '$<', '$', '=>', '>', '<', '+', '*'
    ],
    
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    
    // Tokenizer states
    tokenizer: {
      root: [
        // Comments
        [/#.*$/, 'comment'],
        
        // Import statements - pattern rewritten to avoid Monaco token parsing issue
        [/@[i][m][p][o][r][t]\s+"[^"]*"\s+as\s+\w+/, 'keyword'],
        
        // Entity declarations with names
        [/^(\s*)(program|file|class|function|dto|component|constants|asset|dependency|runParameter)(\s+)(\w+)/, 
          ['white', 'keyword', 'white', 'type.identifier']],
        
        // Shortform entity patterns
        [/^(\w+)(\s*)(->)(\s*)(\w+)/, ['type.identifier', 'white', 'operator', 'white', 'variable']],
        [/^(\w+)(\s*)(@)(\s*)([^:]+):/, ['type.identifier', 'white', 'operator', 'white', 'string']],
        [/^(\w+)(\s*)(::)/, ['type.identifier', 'white', 'operator']],
        [/^(\w+)(\s*)(<:)(\s*)(\w+)/, ['type.identifier', 'white', 'operator', 'white', 'type.identifier']],
        [/^(\w+)(\s*)(%)/, ['type.identifier', 'white', 'operator']],
        [/^(\w+)(\s*)(!)/, ['type.identifier', 'white', 'operator']],
        [/^(\w+)(\s*)(&!?)/, ['type.identifier', 'white', 'operator']],
        [/^(\w+)(\s*)(\$)/, ['type.identifier', 'white', 'operator']],
        [/^(\w+)(\s*)(\*)/, ['type.identifier', 'white', 'operator']],
        [/^(\w+)(\s*)(\+)/, ['type.identifier', 'white', 'operator']],
        
        // DTO field pattern - simplified to avoid group matching issues
        [/^\s*-\s*\w+:\s*\w+/, 'variable'],
        
        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        
        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
        
        // Type identifiers (capitalized)
        [/[A-Z][\w$]*/, 'type.identifier'],
        
        // Keywords and identifiers
        [/[a-zA-Z_]\w*/, {
          cases: {
            '@keywords': 'keyword',
            '@typeKeywords': 'type',
            '@default': 'identifier'
          }
        }],
        
        // Brackets
        [/[{}()\[\]]/, '@brackets'],
        
        // Operators
        [/@symbols/, {
          cases: {
            '@operators': 'operator',
            '@default': ''
          }
        }],
        
        // Whitespace
        [/[ \t\r\n]+/, ''],
        
        // Delimiter
        [/[,;]/, 'delimiter']
      ],
      
      string_double: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ],
      
      string_single: [
        [/[^\\']+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string', '@pop']
      ]
    }
  });

  // Register completion provider
  monaco.languages.registerCompletionItemProvider('typedmind', {
    triggerCharacters: ['.', ':', '@', '<', '>', '[', '(', '"', "'", ' '],
    
    provideCompletionItems: function(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const lineContent = model.getLineContent(position.lineNumber);
      const beforeCursor = lineContent.substring(0, position.column - 1).trim();
      
      let suggestions = [];

      // Root level entity suggestions
      if (!beforeCursor || position.column === 1) {
        suggestions = [
          {
            label: 'program',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'program ${1:ProgramName} {\n  entryPoint: ${2:main}\n  version: "${3:1.0.0}"\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a new program (longform)'
          },
          {
            label: 'file',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'file ${1:fileName} {\n  path: "${2:path/to/file.ts}"\n  imports: [${3}]\n  exports: [${4}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a file module'
          },
          {
            label: 'class',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'class ${1:ClassName} {\n  extends: ${2:BaseClass}\n  methods: [${3}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a class'
          },
          {
            label: 'function',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'function ${1:functionName} {\n  signature: ${2:(params) => ReturnType}\n  description: "${3}"\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a function'
          },
          {
            label: 'dto',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'dto ${1:DtoName} {\n  description: "${2}"\n  fields: [\n    { name: "${3:field}", type: "${4:string}", description: "${5}" }\n  ]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a Data Transfer Object'
          },
          {
            label: 'component',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'component ${1:ComponentName} {\n  description: "${2}"\n  contains: [${3}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a UI component'
          },
          {
            label: '@import',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '@import "${1:./path/to/file.tmd}" as ${2:alias}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Import another TypedMind file'
          }
        ];
      }

      return {
        suggestions: suggestions.map(function(s) { 
          s.range = range;
          return s;
        })
      };
    }
  });

  // Define theme colors
  monaco.editor.defineTheme('typedmind-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '608B4E' },
      { token: 'keyword', foreground: 'C586C0' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'operator', foreground: 'D4D4D4' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'type.identifier', foreground: '4EC9B0' },
      { token: 'type.identifier', foreground: 'DCDCAA' },
      { token: 'variable', foreground: '9CDCFE' }
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4'
    }
  });
}

// Default TypedMind examples
const TYPEDMIND_EXAMPLES = {
  longform: `# Longform syntax is for humans
program TodoApp {
  entryPoint: models
  version: "1.0.0"
}

# Data Models
file models {
  path: "models.ts"
  exports: [Todo, CreateTodoInput]
}

dto Todo {
  description: "Todo entity"
  fields: [
    { name: "id", type: "string", description: "Unique identifier" },
    { name: "title", type: "string", description: "Todo title" },
    { name: "completed", type: "boolean", description: "Completion status" },
    { name: "createdAt", type: "Date", description: "Creation timestamp" }
  ]
}

dto CreateTodoInput {
  description: "Input for creating todos"
  fields: [
    { name: "title", type: "string", description: "Todo title" },
    { name: "completed", type: "boolean", description: "Initial completion status" }
  ]
}`,

  shortform: `# Shortform syntax is for LLMs
TodoApp -> models v1.0.0

# Data Models
models @ models.ts:
  -> [Todo, CreateTodoInput]

Todo % "Todo entity"
  - id: string "Unique identifier"
  - title: string "Todo title"
  - completed: boolean "Completion status"
  - createdAt: Date "Creation timestamp"

CreateTodoInput % "Input for creating todos"
  - title: string "Todo title"
  - completed: boolean "Initial completion status"`
};

// Initialize TypedMind editor
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing Monaco after delay...');
  
  // Small delay to ensure all styles are applied
  setTimeout(function() {
  
  if (typeof require === 'undefined') {
    console.error('Monaco loader not available');
    return;
  }
  
  require.config({ 
    paths: { 
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
    } 
  });

  require(['vs/editor/editor.main'], function() {
    console.log('Monaco main loaded');
    
    // Register TypedMind language
    registerTypedMindLanguage(monaco);
    
    const container = document.getElementById('monaco-editor');
    if (!container) {
      console.error('Container not found');
      return;
    }
    
    // Log container dimensions
    console.log('Container dimensions:', {
      width: container.offsetWidth,
      height: container.offsetHeight,
      parent: container.parentElement
    });
    
    // Ensure container has dimensions
    if (container.offsetHeight === 0) {
      console.warn('Container has zero height, setting minimum height');
      container.style.minHeight = '500px';
    }
    
    // Create TypedMind editor
    try {
      const editor = monaco.editor.create(container, {
      value: TYPEDMIND_EXAMPLES.longform,
      language: 'typedmind',
      theme: 'typedmind-dark',
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      renderWhitespace: 'selection',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: {
        other: true,
        comments: false,
        strings: true
      }
      });
      
      console.log('TypedMind editor created successfully');
      window.typedMindEditor = editor; // Make it globally accessible
    } catch (error) {
      console.error('Failed to create Monaco editor:', error);
      // Try a fallback with minimal options
      try {
        const fallbackEditor = monaco.editor.create(container, {
          value: '# TypedMind Playground\n\n' + TYPEDMIND_EXAMPLES.longform,
          language: 'plaintext',
          theme: 'vs-dark'
        });
        console.log('Created fallback editor');
        window.typedMindEditor = fallbackEditor;
      } catch (fallbackError) {
        console.error('Fallback editor also failed:', fallbackError);
      }
    }
    
    // Handle syntax toggle buttons
    const syntaxButtons = document.querySelectorAll('.syntax-toggle .toggle-btn');
    syntaxButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        syntaxButtons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        
        const syntax = btn.getAttribute('data-syntax');
        if (window.typedMindEditor) {
          window.typedMindEditor.setValue(TYPEDMIND_EXAMPLES[syntax] || TYPEDMIND_EXAMPLES.longform);
        }
      });
    });
    
    // Handle example selector
    const exampleSelect = document.getElementById('exampleSelect');
    if (exampleSelect) {
      exampleSelect.addEventListener('change', function(e) {
        const example = e.target.value;
        if (example && window.PLAYGROUND_EXAMPLES && window.PLAYGROUND_EXAMPLES[example]) {
          const currentSyntax = document.querySelector('.syntax-toggle .toggle-btn.active').getAttribute('data-syntax') || 'longform';
          if (window.typedMindEditor) {
            window.typedMindEditor.setValue(window.PLAYGROUND_EXAMPLES[example][currentSyntax] || '');
          }
        }
      });
    }
  });
  }, 100); // 100ms delay
});