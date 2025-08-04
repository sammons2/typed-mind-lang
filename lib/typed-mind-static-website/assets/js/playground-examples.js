// Playground Examples - Now loading from .tmd files
const snippetLoader = new SnippetLoader();

// Initialize examples object that will be populated
export const examples = {
  longform: {},
  shortform: {}
};

// Snippet mapping for playground examples
const snippetMapping = {
  longform: {
    todoApp: 'playground-todo-longform',
    microservices: 'playground-microservices-longform',
    reactApp: 'playground-react-longform',
    apiGateway: 'playground-api-gateway-longform'
  },
  shortform: {
    todoApp: 'playground-todo-shortform',
    microservices: 'playground-microservices-shortform',
    reactApp: 'playground-react-shortform',
    apiGateway: 'playground-api-gateway-shortform'
  }
};

// Load all snippets and populate examples
async function loadAllExamples() {
  try {
    // Get all snippet names
    const allSnippetNames = [
      ...Object.values(snippetMapping.longform),
      ...Object.values(snippetMapping.shortform)
    ];
    
    // Load all snippets
    const snippets = await snippetLoader.loadSnippets(allSnippetNames);
    
    // Populate examples object
    for (const [syntax, mapping] of Object.entries(snippetMapping)) {
      for (const [exampleName, snippetName] of Object.entries(mapping)) {
        examples[syntax][exampleName] = snippets[snippetName];
      }
    }
    
    console.log('All playground examples loaded successfully');
    return examples;
  } catch (error) {
    console.error('Error loading playground examples:', error);
    // Fall back to empty examples
    return examples;
  }
}

// Export the loader function
export { loadAllExamples };
