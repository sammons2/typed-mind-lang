// Snippet loader utility for TypedMind static website
class SnippetLoader {
  constructor() {
    this.cache = new Map();
    this.baseUrl = './snippets/';
  }

  /**
   * Load a snippet from a .tmd file
   * @param {string} snippetName - Name of the snippet file (without .tmd extension)
   * @returns {Promise<string>} - The snippet content
   */
  async loadSnippet(snippetName) {
    if (this.cache.has(snippetName)) {
      return this.cache.get(snippetName);
    }

    try {
      const response = await fetch(`${this.baseUrl}${snippetName}.tmd`);
      if (!response.ok) {
        throw new Error(`Failed to load snippet: ${snippetName}`);
      }
      const content = await response.text();
      this.cache.set(snippetName, content);
      return content;
    } catch (error) {
      console.error(`Error loading snippet ${snippetName}:`, error);
      return `# Error loading snippet: ${snippetName}\n# ${error.message}`;
    }
  }

  /**
   * Load multiple snippets
   * @param {string[]} snippetNames - Array of snippet names
   * @returns {Promise<Object>} - Object with snippet names as keys and content as values
   */
  async loadSnippets(snippetNames) {
    const promises = snippetNames.map(async (name) => {
      const content = await this.loadSnippet(name);
      return [name, content];
    });
    
    const results = await Promise.all(promises);
    return Object.fromEntries(results);
  }

  /**
   * Clear the cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnippetLoader;
} else {
  window.SnippetLoader = SnippetLoader;
}