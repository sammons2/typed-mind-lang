// Simple test to verify Monaco loads
window.addEventListener('load', () => {
  console.log('Page loaded, initializing Monaco...');
  
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
    
    const container = document.getElementById('monaco-editor');
    if (!container) {
      console.error('Container not found');
      return;
    }
    
    // Create a simple editor
    const editor = monaco.editor.create(container, {
      value: '// Test editor\nfunction hello() {\n  console.log("Hello World!");\n}',
      language: 'javascript',
      theme: 'vs-dark'
    });
    
    console.log('Editor created successfully');
  });
});