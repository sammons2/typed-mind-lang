// Website snippet loader for main index.html
class WebsiteSnippets {
  constructor() {
    this.snippetLoader = new SnippetLoader();
    this.initialized = false;
  }

  // Mapping of website elements to their corresponding snippet files
  getSnippetMapping() {
    return {
      // Hero section
      'hero-longform': 'hero-longform',
      'hero-shortform': 'hero-shortform',
      
      // Syntax guide tabs
      'program-longform': 'program-longform',
      'program-shortform': 'program-shortform',
      'file-longform': 'file-longform',
      'file-shortform': 'file-shortform',
      'class-longform': 'class-longform',
      'class-shortform': 'class-shortform',
      'function-longform': 'function-longform',
      'function-shortform': 'function-shortform',
      'dto-longform': 'dto-longform',
      'dto-shortform': 'dto-shortform',
      'uicomponent-longform': 'uicomponent-longform',
      'uicomponent-shortform': 'uicomponent-shortform',
      'asset-longform': 'asset-longform',
      'asset-shortform': 'asset-shortform',
      'constants-longform': 'constants-longform',
      'constants-shortform': 'constants-shortform',
      'runparameter-longform': 'runparameter-longform',
      'runparameter-shortform': 'runparameter-shortform',
      'dependency-longform': 'dependency-longform',
      'dependency-shortform': 'dependency-shortform',
      'import-longform': 'import-longform',
      'import-shortform': 'import-shortform',
      
      // Getting started section
      'getting-started-longform': 'getting-started-longform',
      'getting-started-shortform': 'getting-started-shortform',
      'getting-started-dto-longform': 'getting-started-dto-longform',
      'getting-started-dto-shortform': 'getting-started-dto-shortform'
    };
  }

  /**
   * Initialize and load all website snippets
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      const mapping = this.getSnippetMapping();
      const snippetNames = Object.values(mapping);
      
      console.log('Loading website snippets...');
      const snippets = await this.snippetLoader.loadSnippets(snippetNames);
      
      // Update hero section
      this.updateHeroSection(snippets);
      
      // Update syntax guide tabs
      this.updateSyntaxGuide(snippets);
      
      // Update getting started section
      this.updateGettingStarted(snippets);
      
      this.initialized = true;
      console.log('Website snippets loaded successfully');
      
      // Re-run Prism highlighting on the updated code blocks
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
      
    } catch (error) {
      console.error('Error loading website snippets:', error);
    }
  }

  /**
   * Update hero section code examples
   */
  updateHeroSection(snippets) {
    const longformCode = document.querySelector('.hero-code .longform-code code');
    const shortformCode = document.querySelector('.hero-code .shortform-code code');
    
    if (longformCode && snippets['hero-longform']) {
      longformCode.textContent = snippets['hero-longform'];
    }
    
    if (shortformCode && snippets['hero-shortform']) {
      shortformCode.textContent = snippets['hero-shortform'];
    }
  }

  /**
   * Update syntax guide tab content
   */
  updateSyntaxGuide(snippets) {
    const tabs = [
      'program', 'file', 'class', 'function', 'dto', 'uicomponent',
      'asset', 'constants', 'runparameter', 'dependency', 'import'
    ];

    tabs.forEach(tab => {
      const tabPane = document.getElementById(`${tab}-tab`);
      if (!tabPane) return;

      const longformCode = tabPane.querySelector('.longform-code code');
      const shortformCode = tabPane.querySelector('.shortform-code code');

      const longformKey = `${tab}-longform`;
      const shortformKey = `${tab}-shortform`;

      if (longformCode && snippets[longformKey]) {
        longformCode.textContent = snippets[longformKey];
      }

      if (shortformCode && snippets[shortformKey]) {
        shortformCode.textContent = snippets[shortformKey];
      }
    });
  }

  /**
   * Update getting started section
   */
  updateGettingStarted(snippets) {
    // Find all getting started code blocks
    const gettingStartedSection = document.getElementById('getting-started');
    if (!gettingStartedSection) return;

    const codeBlocks = gettingStartedSection.querySelectorAll('.longform-code code, .shortform-code code');
    
    codeBlocks.forEach((codeBlock, index) => {
      const isLongform = codeBlock.closest('.longform-code') !== null;
      const isDto = codeBlock.textContent.includes('dto User') || codeBlock.textContent.includes('User %');
      
      let snippetKey;
      if (isDto) {
        snippetKey = isLongform ? 'getting-started-dto-longform' : 'getting-started-dto-shortform';
      } else {
        snippetKey = isLongform ? 'getting-started-longform' : 'getting-started-shortform';
      }
      
      if (snippets[snippetKey]) {
        codeBlock.textContent = snippets[snippetKey];
      }
    });
  }
}

// Initialize website snippets when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    // Wait a bit for other scripts to load
    setTimeout(async () => {
      const websiteSnippets = new WebsiteSnippets();
      await websiteSnippets.initialize();
    }, 100);
  });
}