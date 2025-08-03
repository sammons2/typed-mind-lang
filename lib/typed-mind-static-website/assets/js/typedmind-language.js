// TypedMind Language Definition for Monaco Editor
export function setupTypedMindLanguage(monaco) {
  // Register language
  monaco.languages.register({ id: 'typedmind' });

  // Define tokens
  monaco.languages.setMonarchTokensProvider('typedmind', {
    keywords: [
      'program', 'file', 'function', 'class', 'dto', 'constants', 
      'asset', 'component', 'runParameter', 'dependency',
      'entryPoint', 'version', 'path', 'imports', 'exports',
      'signature', 'description', 'input', 'output', 'calls',
      'affects', 'consumes', 'extends', 'methods', 'fields',
      'name', 'type', 'optional', 'root', 'contains', 'containedBy',
      'schema', 'mimeTypes', 'sourceFile', 'targetFile',
      'optional', 'true', 'false'
    ],
    
    operators: [
      '->', '@', '::', '<:', '%', '!', '&', '&!', '~', '<-', '->',
      '~>', '$<', '=>', '>', '<', '[', ']', ':', ','
    ],
    
    // Define token rules
    tokenizer: {
      root: [
        // Comments
        [/#.*$/, 'comment'],
        
        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string'],
        
        // Numbers
        [/\d+\.\d+/, 'number.float'],
        [/\d+/, 'number'],
        
        // Keywords
        [/[a-z_$][\w$]*/, {
          cases: {
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }],
        
        // Type identifiers (capitalized)
        [/[A-Z][\w$]*/, 'type.identifier'],
        
        // Operators
        [/@operators/, 'operator'],
        
        // Whitespace
        { include: '@whitespace' }
      ],
      
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ],
      
      whitespace: [
        [/[ \t\r\n]+/, ''],
        [/#.*$/, 'comment']
      ]
    }
  });

  // Define language configuration
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
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*(program|file|class|function|dto|component)\\s+\\w+\\s*\\{"),
        end: new RegExp("^\\s*\\}")
      }
    }
  });

  // Register completion provider
  monaco.languages.registerCompletionItemProvider('typedmind', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      // Context-aware suggestions
      const lineContent = model.getLineContent(position.lineNumber);
      const beforeCursor = lineContent.substring(0, position.column - 1);
      
      let suggestions = [];

      // Root level suggestions
      if (position.lineNumber === 1 || !beforeCursor.trim()) {
        suggestions = [
          {
            label: 'program',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'program ${1:MyApp} {\n  entryPoint: ${2:main}\n  version: "${3:1.0.0}"\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a new program'
          },
          {
            label: 'file',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'file ${1:name} {\n  path: "${2:path/to/file.ts}"\n  imports: [${3}]\n  exports: [${4}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a file'
          },
          {
            label: 'class',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'class ${1:ClassName} {\n  extends: ${2:BaseClass}\n  methods: [${3}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a class'
          },
          {
            label: 'function',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'function ${1:functionName} {\n  signature: ${2:(params) => ReturnType}\n  description: "${3:Description}"\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a function'
          },
          {
            label: 'dto',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'dto ${1:DtoName} {\n  description: "${2:Description}"\n  fields: [\n    { name: "${3:fieldName}", type: "${4:string}", description: "${5:Field description}" }\n  ]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a DTO'
          },
          {
            label: 'component',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'component ${1:ComponentName} {\n  description: "${2:Description}"\n  contains: [${3}]\n  containedBy: [${4}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a UI component'
          }
        ];
      }
      
      // Inside entity suggestions
      if (beforeCursor.includes('{') && !beforeCursor.includes('}')) {
        const entityType = detectEntityType(model, position);
        suggestions = getEntityFieldSuggestions(entityType);
      }

      return {
        suggestions: suggestions.map(s => ({
          ...s,
          range: range
        }))
      };
    }
  });

  // Hover provider
  monaco.languages.registerHoverProvider('typedmind', {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      const hoverInfo = getHoverInfo(word.word);
      if (hoverInfo) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: [
            { value: `**${word.word}**` },
            { value: hoverInfo }
          ]
        };
      }
    }
  });
}

// Detect entity type from context
function detectEntityType(model, position) {
  for (let line = position.lineNumber; line >= 1; line--) {
    const content = model.getLineContent(line);
    if (content.match(/^(program|file|class|function|dto|component|constants|asset)/)) {
      return content.match(/^(\w+)/)[1];
    }
  }
  return null;
}

// Get field suggestions based on entity type
function getEntityFieldSuggestions(entityType) {
  const fieldMap = {
    program: ['entryPoint', 'version', 'description'],
    file: ['path', 'imports', 'exports'],
    class: ['extends', 'methods', 'description'],
    function: ['signature', 'description', 'input', 'output', 'calls', 'affects', 'consumes'],
    dto: ['description', 'fields'],
    component: ['description', 'root', 'contains', 'containedBy'],
    constants: ['path', 'schema'],
    asset: ['mimeTypes', 'sourceFile', 'targetFile']
  };

  const fields = fieldMap[entityType] || [];
  return fields.map(field => ({
    label: field,
    kind: monaco.languages.CompletionItemKind.Property,
    insertText: `${field}: `,
    documentation: `${entityType} ${field} property`
  }));
}

// Get hover information
function getHoverInfo(word) {
  const info = {
    'program': 'Defines the entry point and metadata for a TypedMind application',
    'file': 'Represents a source file with imports and exports',
    'function': 'Defines a function with its signature, inputs, outputs, and relationships',
    'class': 'Defines a class with its methods and inheritance',
    'dto': 'Data Transfer Object - defines data structures with typed fields',
    'component': 'UI component with hierarchical relationships',
    'constants': 'Configuration constants loaded from external files',
    'asset': 'Static assets like images or files',
    'dependency': 'External package dependency',
    'runParameter': 'Runtime parameters passed via command line or environment'
  };
  
  return info[word];
}