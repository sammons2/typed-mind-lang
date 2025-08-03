// TypedMind Language Support for Monaco Editor with Real Parser Integration

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

  // Define simplified monarch tokenizer for basic syntax highlighting
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
    
    // Simple tokenizer - no complex regex with capture groups
    tokenizer: {
      root: [
        // Comments
        [/#.*$/, 'comment'],
        
        // Keywords
        [/\b(?:program|file|function|class|dto|component|constants|asset|dependency|runParameter)\b/, 'keyword'],
        [/\b(?:entryPoint|version|path|imports|exports|signature|description|input|output|calls|affects|consumes|extends|methods|fields|name|type|optional|root|contains|containedBy|schema|mimeTypes|sourceFile|targetFile)\b/, 'keyword'],
        
        // Strings - simplified pattern
        [/"[^"]*"/, 'string'],
        [/"[^"]*$/, 'string.invalid'],
        
        // Numbers
        [/\d+\.\d+/, 'number.float'],
        [/\d+/, 'number'],
        
        // Simple operators
        [/->/, 'operator'],
        [/@/, 'operator'],
        [/::/, 'operator'],
        [/<:/, 'operator'],
        [/%/, 'operator'],
        [/!/, 'operator'],
        [/&!/, 'operator'],
        [/&/, 'operator'],
        [/~>/, 'operator'],
        [/~/, 'operator'],
        [/<-/, 'operator'],
        [/\$</, 'operator'],
        [/\$/, 'operator'],
        [/=>/, 'operator'],
        [/>/, 'operator'],
        [/</, 'operator'],
        [/:/, 'operator'],
        
        // Type identifiers (capitalized words)
        [/\b[A-Z]\w*\b/, 'type'],
        
        // Identifiers
        [/\b\w+\b/, 'identifier'],
        
        // Brackets
        [/[{}()\[\]]/, '@brackets'],
        
        // Whitespace
        [/[ \t\r\n]+/, 'white']
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

// Parser integration and validation
let parser = null;
let lastValidationTimeout = null;

function initializeParser() {
  if (typeof TypedMindParser !== 'undefined') {
    parser = new TypedMindParser();
    console.log('TypedMind parser initialized');
  } else {
    console.warn('TypedMind parser not available');
  }
}

function validateCode(editor) {
  if (!parser) return;

  clearTimeout(lastValidationTimeout);
  lastValidationTimeout = setTimeout(() => {
    const code = editor.getValue();
    const result = parser.parse(code);
    
    // Clear existing markers
    monaco.editor.setModelMarkers(editor.getModel(), 'typedmind', []);
    
    // Add error markers
    if (result.errors && result.errors.length > 0) {
      const markers = result.errors.map(error => ({
        severity: monaco.MarkerSeverity.Error,
        message: error.message,
        startLineNumber: error.line,
        startColumn: error.column,
        endLineNumber: error.line,
        endColumn: error.column + 10
      }));
      
      monaco.editor.setModelMarkers(editor.getModel(), 'typedmind', markers);
    }
    
    // Update problems panel
    updateProblemsPanel(result.errors || []);
    
    // Update AST panel
    updateASTPanel(result);
    
  }, 500); // Debounce validation
}

function updateProblemsPanel(errors) {
  const problemsList = document.getElementById('problemsList');
  if (!problemsList) return;
  
  if (errors.length === 0) {
    problemsList.innerHTML = `
      <div class="no-problems">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>No problems detected</span>
      </div>
    `;
  } else {
    const problemsHtml = errors.map(error => `
      <div class="problem-item">
        <div class="problem-icon error">⚠️</div>
        <div class="problem-content">
          <div class="problem-message">${error.message}</div>
          <div class="problem-location">Line ${error.line}, Column ${error.column}</div>
        </div>
      </div>
    `).join('');
    
    problemsList.innerHTML = problemsHtml;
  }
}

function updateASTPanel(result) {
  const astOutput = document.getElementById('astOutput');
  if (!astOutput) return;
  
  const entities = Array.from(result.entities.values());
  const astData = {
    entities: entities.map(entity => ({
      name: entity.name,
      type: entity.type,
      position: entity.position,
      properties: Object.fromEntries(
        Object.entries(entity).filter(([key]) => 
          !['name', 'type', 'position', 'raw', 'comment'].includes(key)
        )
      )
    })),
    imports: result.imports
  };
  
  astOutput.textContent = JSON.stringify(astData, null, 2);
}

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
      
      // Initialize parser
      initializeParser();
      
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
        
        // Set up content change validation
        editor.onDidChangeModelContent(() => {
          validateCode(editor);
        });
        
        // Initial validation
        validateCode(editor);
        
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
        
        // Handle tab switching
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            const tabName = btn.getAttribute('data-tab');
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(function(b) {
              b.classList.remove('active');
            });
            btn.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(function(content) {
              content.classList.remove('active');
            });
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) {
              targetTab.classList.add('active');
            }
          });
        });
        
      } catch (error) {
        console.error('Failed to create editor:', error);
      }
    });
  }, 100);
});