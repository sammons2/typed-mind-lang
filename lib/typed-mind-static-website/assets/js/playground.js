// TypedMind Playground with Monaco Editor
import { setupTypedMindLanguage } from './typedmind-language.js';
import { DSLParser, GrammarValidator } from '../typed-mind/dist/index.js';
import { examples } from './playground-examples.js';

let editor;
let parser;
let grammarValidator;
let currentSyntax = 'longform';

// Initialize Monaco Editor
function initMonaco() {
  require.config({ 
    paths: { 
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
    } 
  });

  require(['vs/editor/editor.main'], function() {
    console.log('Monaco loaded successfully');
    
    // Register TypedMind language
    setupTypedMindLanguage(monaco);
    
    // Create editor
    const editorContainer = document.getElementById('monaco-editor');
    if (!editorContainer) {
      console.error('Editor container not found');
      return;
    }
    
    editor = monaco.editor.create(editorContainer, {
      value: getInitialCode(),
      language: 'typedmind',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {
        enabled: false
      },
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      renderWhitespace: 'selection',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      glyphMargin: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: {
        other: true,
        comments: false,
        strings: true
      }
    });
    
    // Initialize parser and validator from the library
    try {
      parser = new DSLParser();
      grammarValidator = new GrammarValidator();
      console.log('Parser and validator initialized');
    } catch (error) {
      console.error('Failed to initialize parser:', error);
    }
    
    // Set up listeners
    editor.onDidChangeModelContent(debounce(validateCode, 300));
    
    // Initial validation
    validateCode();
    
    // Load from URL if present
    loadFromUrl();
  });
}

// Get initial code
function getInitialCode() {
  return examples.longform.todoApp;
}

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Validate code
function validateCode() {
  const code = editor.getValue();
  const model = editor.getModel();
  
  try {
    // Parse the code using the typed-mind library
    const result = parser.parse(code, { validateGrammar: true });
    
    // Clear existing markers
    monaco.editor.setModelMarkers(model, 'typedmind', []);
    
    // Validate each entity
    const problems = [];
    for (const [name, entity] of result.entities) {
      const validation = grammarValidator.validateEntity(entity);
      if (!validation.valid) {
        validation.errors.forEach(error => {
          problems.push({
            type: 'error',
            message: `${name}: ${error}`,
            line: entity.position?.line || 1,
            column: entity.position?.column || 1
          });
        });
      }
    }
    
    // Update problems panel
    updateProblemsPanel(problems);
    
    // Update AST
    updateAstPanel({
      entities: Array.from(result.entities.entries()).map(([name, entity]) => ({
        name,
        ...entity
      })),
      imports: result.imports
    });
    
  } catch (error) {
    // Handle parse errors
    let line = 1;
    let column = 1;
    
    // Try to extract line info from error message
    const lineMatch = error.message.match(/line (\d+)/i);
    if (lineMatch) {
      line = parseInt(lineMatch[1]);
    }
    
    // Create error marker
    const markers = [{
      severity: monaco.MarkerSeverity.Error,
      startLineNumber: line,
      startColumn: column,
      endLineNumber: line,
      endColumn: column + 50, // Highlight more of the line
      message: error.message
    }];
    
    monaco.editor.setModelMarkers(model, 'typedmind', markers);
    
    // Update problems panel
    updateProblemsPanel([{
      type: 'error',
      message: error.message,
      line: line,
      column: column
    }]);
  }
}

// Update problems panel
function updateProblemsPanel(problems) {
  const problemsList = document.getElementById('problemsList');
  
  if (problems.length === 0) {
    problemsList.innerHTML = `
      <div class="no-problems">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>No problems detected</span>
      </div>
    `;
  } else {
    problemsList.innerHTML = problems.map(problem => `
      <div class="problem-item">
        <svg class="problem-icon ${problem.type}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          ${problem.type === 'error' ? 
            '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" stroke-width="2"/>' :
            '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="white" stroke-width="2"/>'
          }
        </svg>
        <div class="problem-content">
          <div class="problem-message">${problem.message}</div>
          <div class="problem-location">Line ${problem.line}, Column ${problem.column}</div>
        </div>
      </div>
    `).join('');
  }
}

// Update AST panel
function updateAstPanel(ast) {
  const astOutput = document.getElementById('astOutput');
  astOutput.textContent = JSON.stringify(ast, null, 2);
}

// Syntax toggle
document.querySelectorAll('.syntax-toggle .toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.syntax-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentSyntax = btn.getAttribute('data-syntax');
    
    // Convert current code to new syntax
    if (editor) {
      const currentExample = getCurrentExample();
      if (currentExample) {
        editor.setValue(examples[currentSyntax][currentExample] || examples[currentSyntax].todoApp);
      }
    }
  });
});

// Get current example name
function getCurrentExample() {
  const select = document.getElementById('exampleSelect');
  return select.value || 'todoApp';
}

// Example selection
document.getElementById('exampleSelect').addEventListener('change', (e) => {
  if (e.target.value && editor) {
    const example = examples[currentSyntax][e.target.value];
    if (example) {
      editor.setValue(example);
    }
  }
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    
    // Update active states
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
  });
});

// Share functionality
document.getElementById('shareBtn').addEventListener('click', () => {
  const code = editor.getValue();
  const compressed = compressCode(code);
  const url = `${window.location.origin}${window.location.pathname}#code=${compressed}`;
  
  document.getElementById('shareUrl').value = url;
  document.getElementById('shareModal').classList.add('active');
});

// Copy to clipboard
document.getElementById('copyBtn').addEventListener('click', async () => {
  const shareUrl = document.getElementById('shareUrl');
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    const btn = document.getElementById('copyBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
});

// Close modal
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('shareModal').classList.remove('active');
});

// Click outside to close modal
document.getElementById('shareModal').addEventListener('click', (e) => {
  if (e.target.id === 'shareModal') {
    document.getElementById('shareModal').classList.remove('active');
  }
});

// Format code
document.getElementById('formatBtn').addEventListener('click', () => {
  if (editor) {
    editor.getAction('editor.action.formatDocument').run();
  }
});

// Compress code for URL
function compressCode(code) {
  return btoa(encodeURIComponent(code).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode('0x' + p1);
  }));
}

// Decompress code from URL
function decompressCode(compressed) {
  try {
    return decodeURIComponent(atob(compressed).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (err) {
    console.error('Failed to decompress code:', err);
    return '';
  }
}

// Load code from URL
function loadFromUrl() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#code=')) {
    const compressed = hash.substring(6);
    const code = decompressCode(compressed);
    if (code && editor) {
      editor.setValue(code);
      
      // Try to detect syntax type
      if (code.includes('program ') && code.includes('{')) {
        currentSyntax = 'longform';
        document.querySelector('[data-syntax="longform"]').click();
      } else {
        currentSyntax = 'shortform';
        document.querySelector('[data-syntax="shortform"]').click();
      }
    }
  }
}

// Initialize on load
window.addEventListener('load', () => {
  // Ensure require is available
  if (typeof require !== 'undefined') {
    initMonaco();
  } else {
    // Wait for require to be available
    const checkRequire = setInterval(() => {
      if (typeof require !== 'undefined') {
        clearInterval(checkRequire);
        initMonaco();
      }
    }, 100);
  }
});