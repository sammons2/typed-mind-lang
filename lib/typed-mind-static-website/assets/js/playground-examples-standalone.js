// Playground Examples (Standalone) - Now loading from .tmd files
window.PLAYGROUND_EXAMPLES = {};

// Initialize snippet loader for playground
const playgroundSnippetLoader = new SnippetLoader();

// Load playground examples from .tmd files
async function loadPlaygroundExamples() {
  try {
    const exampleMapping = {
      'todo-app': {
        longform: 'playground-todo-longform',
        shortform: 'playground-todo-shortform'
      },
      'microservices': {
        longform: 'playground-microservices-longform',
        shortform: 'playground-microservices-shortform'
      },
      'react-app': {
        longform: 'playground-react-longform',
        shortform: 'playground-react-shortform'
      },
      'api-gateway': {
        longform: 'playground-api-gateway-longform',
        shortform: 'playground-api-gateway-shortform'
      }
    };

    // Get all snippet names
    const allSnippetNames = [];
    for (const example of Object.values(exampleMapping)) {
      allSnippetNames.push(example.longform, example.shortform);
    }

    // Load all snippets
    const snippets = await playgroundSnippetLoader.loadSnippets(allSnippetNames);

    // Populate PLAYGROUND_EXAMPLES
    for (const [exampleKey, mapping] of Object.entries(exampleMapping)) {
      window.PLAYGROUND_EXAMPLES[exampleKey] = {
        longform: snippets[mapping.longform] || '# Error loading longform example',
        shortform: snippets[mapping.shortform] || '# Error loading shortform example'
      };
    }

    console.log('Playground examples loaded successfully');
    
    // Dispatch event to notify that examples are ready
    window.dispatchEvent(new CustomEvent('playgroundExamplesLoaded'));
    
  } catch (error) {
    console.error('Error loading playground examples:', error);
    
    // Fallback to empty examples
    window.PLAYGROUND_EXAMPLES = {
      'todo-app': {
        longform: '# Error loading examples\n# Please check console for details',
        shortform: '# Error loading examples\n# Please check console for details'
      }
    };
  }
}

// Load examples when the script loads
loadPlaygroundExamples();