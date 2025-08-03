// Simplified TypedMind Language Support for Monaco Editor
// Avoiding complex regex patterns that cause Monaco errors

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
      { open: '"', close: '"', notIn: ['string'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' }
    ]
  });

  // Define monarch tokenizer with simplified patterns
  monaco.languages.setMonarchTokensProvider('typedmind', {
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
    
    operators: [
      '->', '@', '::', '<:', '%', '!', '&', '&!', '~', '~>',
      '<-', '$<', '$', '=>', '>', '<', '+', '*', '-', ':'
    ],
    
    // Tokenizer
    tokenizer: {
      root: [
        // Comments
        [/#.*$/, 'comment'],
        
        // Keywords
        [/\b(program|file|function|class|dto|component|constants|asset|dependency|runParameter)\b/, 'keyword'],
        [/\b(entryPoint|version|path|imports|exports|signature|description|input|output|calls|affects|consumes|extends|methods|fields|name|type|optional|root|contains|containedBy|schema|mimeTypes|sourceFile|targetFile)\b/, 'keyword'],
        
        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string'],
        
        // Numbers
        [/\d+\.\d+/, 'number.float'],
        [/\d+/, 'number'],
        
        // Operators (simplified)
        [/->|@|::|<:|%|!|&!|&|~>|~|<-|$<|$|=>|>|<|\+|\*|-|:/, 'operator'],
        
        // Type identifiers (capitalized words)
        [/\b[A-Z]\w*\b/, 'type'],
        
        // Identifiers
        [/\b\w+\b/, 'identifier'],
        
        // Brackets
        [/[{}()\[\]]/, '@brackets'],
        
        // Whitespace
        [/[ \t\r\n]+/, 'white']
      ],
      
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ]
    }
  });

  // Define theme
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
      { token: 'identifier', foreground: 'D4D4D4' }
    ],
    colors: {}
  });
}

// Default examples
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
  - createdAt: Date "Creation timestamp"`
};

// Initialize editor
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    if (typeof require === 'undefined') {
      console.error('Monaco loader not available');
      return;
    }
    
    require.config({ 
      paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } 
    });

    require(['vs/editor/editor.main'], function() {
      console.log('Monaco loaded, creating editor...');
      
      // Register language
      registerTypedMindLanguage(monaco);
      
      const container = document.getElementById('monaco-editor');
      if (!container) {
        console.error('Container not found');
        return;
      }
      
      // Ensure container has height
      if (container.offsetHeight === 0) {
        container.style.height = '500px';
      }
      
      // Create editor
      try {
        const editor = monaco.editor.create(container, {
          value: TYPEDMIND_EXAMPLES.longform,
          language: 'typedmind',
          theme: 'typedmind-dark',
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          scrollBeyondLastLine: false,
          wordWrap: 'on'
        });
        
        console.log('Editor created successfully');
        window.typedMindEditor = editor;
        
        // Handle syntax toggle
        document.querySelectorAll('.syntax-toggle .toggle-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            document.querySelectorAll('.syntax-toggle .toggle-btn').forEach(function(b) { 
              b.classList.remove('active'); 
            });
            btn.classList.add('active');
            
            const syntax = btn.getAttribute('data-syntax');
            if (window.typedMindEditor && TYPEDMIND_EXAMPLES[syntax]) {
              window.typedMindEditor.setValue(TYPEDMIND_EXAMPLES[syntax]);
            }
          });
        });
        
        // Handle example selector
        const exampleSelect = document.getElementById('exampleSelect');
        if (exampleSelect) {
          exampleSelect.addEventListener('change', function(e) {
            if (e.target.value && window.PLAYGROUND_EXAMPLES && window.PLAYGROUND_EXAMPLES[e.target.value]) {
              const currentSyntax = document.querySelector('.syntax-toggle .toggle-btn.active').getAttribute('data-syntax') || 'longform';
              const example = window.PLAYGROUND_EXAMPLES[e.target.value][currentSyntax];
              if (example && window.typedMindEditor) {
                window.typedMindEditor.setValue(example);
              }
            }
          });
        }
        
      } catch (error) {
        console.error('Failed to create editor:', error);
      }
    });
  }, 100);
});