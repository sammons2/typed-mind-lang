// TypedMind Language Support for Monaco Editor
// Based on VSCode extension syntax highlighting

export function registerTypedMindLanguage(monaco) {
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
        
        // Import statements
        [/@import\s+"[^"]*"\s+as\s+\w+/, 'keyword'],
        [/import\s+/, 'keyword'],
        
        // Entity declarations with names
        [/^(\s*)(program|file|class|function|dto|component|constants|asset|dependency|runParameter)(\s+)(\w+)/, 
          ['', 'keyword', '', 'entity.name']],
        
        // Shortform entity patterns
        [/^(\w+)(\s*)(->)(\s*)(\w+)/, ['entity.name', '', 'operator', '', 'variable']],
        [/^(\w+)(\s*)(@)(\s*)([^:]+):/, ['entity.name', '', 'operator', '', 'string']],
        [/^(\w+)(\s*)(::)/, ['entity.name', '', 'operator']],
        [/^(\w+)(\s*)(<:)(\s*)(\w+)/, ['entity.name', '', 'operator', '', 'type.identifier']],
        [/^(\w+)(\s*)(%)/, ['entity.name', '', 'operator']],
        [/^(\w+)(\s*)(!)/, ['entity.name', '', 'operator']],
        [/^(\w+)(\s*)(&!?)/, ['entity.name', '', 'operator']],
        [/^(\w+)(\s*)(\$)/, ['entity.name', '', 'operator']],
        [/^(\w+)(\s*)(\*)/, ['entity.name', '', 'operator']],
        [/^(\w+)(\s*)(\+)/, ['entity.name', '', 'operator']],
        
        // DTO field pattern
        [/^\s*-\s*(\w+):\s*(\w+(?:\[\])?(?:<\w+>)?)/, ['variable.property', 'type']],
        
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
    
    provideCompletionItems: (model, position) => {
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
          ...getEntitySnippets(),
          ...getImportSnippets()
        ];
      }
      // Inside entity field suggestions
      else if (isInsideEntity(model, position)) {
        const entityType = getEntityType(model, position);
        suggestions = getFieldSuggestions(entityType);
      }
      // Type suggestions after colon
      else if (beforeCursor.endsWith(':')) {
        suggestions = getTypeSuggestions();
      }
      // Operator suggestions
      else if (beforeCursor.match(/^\w+\s*$/)) {
        suggestions = getOperatorSuggestions();
      }

      return {
        suggestions: suggestions.map(s => ({ ...s, range }))
      };
    }
  });

  // Helper functions
  function getEntitySnippets() {
    return [
      {
        label: 'program',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'program ${1:ProgramName} {\n  entryPoint: ${2:main}\n  version: "${3:1.0.0}"\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Define a new program (longform)'
      },
      {
        label: 'program (shortform)',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: '${1:ProgramName} -> ${2:main} v${3:1.0.0}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Define a new program (shortform)'
      },
      {
        label: 'file',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'file ${1:fileName} {\n  path: "${2:path/to/file.ts}"\n  imports: [${3}]\n  exports: [${4}]\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Define a file module'
      },
      {
        label: 'file (shortform)',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: '${1:fileName} @ ${2:path/to/file.ts}:\n  <- [${3}]\n  -> [${4}]',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Define a file module (shortform)'
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
        insertText: 'function ${1:functionName} {\n  signature: ${2:(params) => ReturnType}\n  description: "${3}"\n  ${4}\n}',
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
        insertText: 'component ${1:ComponentName} {\n  description: "${2}"\n  ${3:root: true\n  }contains: [${4}]\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Define a UI component'
      }
    ];
  }

  function getImportSnippets() {
    return [
      {
        label: '@import',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: '@import "${1:./path/to/file.tmd}" as ${2:alias}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Import another TypedMind file'
      }
    ];
  }

  function getFieldSuggestions(entityType) {
    const fieldMap = {
      program: ['entryPoint', 'version', 'description'],
      file: ['path', 'imports', 'exports'],
      class: ['extends', 'methods', 'description'],
      function: ['signature', 'description', 'input', 'output', 'calls', 'affects', 'consumes'],
      dto: ['description', 'fields'],
      component: ['description', 'root', 'contains', 'containedBy'],
      constants: ['path', 'schema'],
      asset: ['mimeTypes', 'sourceFile', 'targetFile'],
      dependency: ['version', 'optional'],
      runParameter: ['schema', 'optional', 'description']
    };

    const fields = fieldMap[entityType] || [];
    return fields.map(field => ({
      label: field,
      kind: monaco.languages.CompletionItemKind.Property,
      insertText: `${field}: `,
      documentation: `${entityType} ${field} property`
    }));
  }

  function getTypeSuggestions() {
    const types = ['string', 'number', 'boolean', 'Date', 'any', 'void', 'object', 'array'];
    return types.map(type => ({
      label: type,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: type,
      documentation: `TypeScript ${type} type`
    }));
  }

  function getOperatorSuggestions() {
    const operators = [
      { op: '->', desc: 'Program entry point' },
      { op: '@', desc: 'File path' },
      { op: '::', desc: 'Function signature' },
      { op: '<:', desc: 'Class inheritance' },
      { op: '%', desc: 'DTO declaration' },
      { op: '!', desc: 'Constants declaration' },
      { op: '&', desc: 'UI Component' },
      { op: '&!', desc: 'Root UI Component' },
      { op: '$', desc: 'Run parameter' },
      { op: '*', desc: 'Asset declaration' },
      { op: '+', desc: 'Dependency declaration' }
    ];
    
    return operators.map(({ op, desc }) => ({
      label: op,
      kind: monaco.languages.CompletionItemKind.Operator,
      insertText: `${op} `,
      documentation: desc
    }));
  }

  function isInsideEntity(model, position) {
    let braceCount = 0;
    for (let line = 1; line <= position.lineNumber; line++) {
      const content = model.getLineContent(line);
      braceCount += (content.match(/{/g) || []).length;
      braceCount -= (content.match(/}/g) || []).length;
    }
    return braceCount > 0;
  }

  function getEntityType(model, position) {
    for (let line = position.lineNumber; line >= 1; line--) {
      const content = model.getLineContent(line);
      const match = content.match(/^\s*(program|file|class|function|dto|component|constants|asset)\s+/);
      if (match) return match[1];
    }
    return null;
  }

  // Hover provider
  monaco.languages.registerHoverProvider('typedmind', {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const hoverInfo = {
        'program': 'Defines the entry point and metadata for a TypedMind application',
        'file': 'Represents a source file with imports and exports',
        'function': 'Defines a function with its signature, inputs, outputs, and relationships',
        'class': 'Defines a class with its methods and inheritance',
        'dto': 'Data Transfer Object - defines data structures with typed fields',
        'component': 'UI component with hierarchical relationships',
        'constants': 'Configuration constants loaded from external files',
        'asset': 'Static assets like images or files',
        'dependency': 'External package dependency',
        'runParameter': 'Runtime parameters passed via command line or environment',
        'entryPoint': 'The main entry file for the program',
        'imports': 'List of entities imported from other files',
        'exports': 'List of entities exported from this file',
        'extends': 'Base class for inheritance',
        'methods': 'List of methods in a class',
        'signature': 'Function signature with parameters and return type',
        'calls': 'Functions that this function calls',
        'affects': 'UI components affected by this function',
        'consumes': 'External resources consumed by this function'
      };
      
      const info = hoverInfo[word.word];
      if (info) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: [
            { value: `**${word.word}**` },
            { value: info }
          ]
        };
      }
      return null;
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
      { token: 'entity.name', foreground: 'DCDCAA' },
      { token: 'variable.property', foreground: '9CDCFE' }
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4'
    }
  });
}