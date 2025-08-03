// RefactoredInitialization - Application initialization with dependency injection
class RefactoredInitialization {
  constructor() {
    this.services = null;
    this.initialized = false;
    this.initPromise = null;
    this.startTime = Date.now();
  }

  /**
   * Initialize the refactored playground application
   */
  async initializeRefactored() {
    if (this.initialized) {
      return this.services;
    }
    
    if (this.initPromise) {
      return this.initPromise;
    }
    
    this.initPromise = this._performInitialization();
    return this.initPromise;
  }

  /**
   * Internal initialization logic
   */
  async _performInitialization() {
    try {
      console.log('[RefactoredInitialization] Starting application initialization...');
      
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Wait for required dependencies to load
      await this.waitForDependencies();
      
      // Setup refactored services
      await this.setupRefactoredServices();
      
      // Initialize UI components
      await this.initializeUI();
      
      // Setup global event handlers
      this.setupGlobalEventHandlers();
      
      // Final setup steps
      await this.finalizeInitialization();
      
      this.initialized = true;
      const initTime = Date.now() - this.startTime;
      console.log(`[RefactoredInitialization] Application initialized successfully in ${initTime}ms`);
      
      return this.services;
    } catch (error) {
      console.error('[RefactoredInitialization] Initialization failed:', error);
      this.handleInitializationError(error);
      throw error;
    }
  }

  /**
   * Wait for DOM to be ready
   */
  async waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * Wait for required dependencies to be available
   */
  async waitForDependencies(maxAttempts = 50, interval = 100) {
    const requiredDependencies = [
      'EventEmitter',
      'BaseUIComponent', 
      'NotificationSystem',
      'TokenManager',
      'ChatService'
    ];
    
    const optionalDependencies = [
      'CodeCheckpointManager',
      'ConfigurationPanel',
      'ChatUIManager'
    ];
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const missingRequired = requiredDependencies.filter(dep => !window[dep]);
      
      if (missingRequired.length === 0) {
        console.log('[RefactoredInitialization] All required dependencies loaded');
        
        // Check optional dependencies
        const missingOptional = optionalDependencies.filter(dep => !window[dep]);
        if (missingOptional.length > 0) {
          console.warn('[RefactoredInitialization] Missing optional dependencies:', missingOptional);
        }
        
        return;
      }
      
      if (attempt === 0) {
        console.log('[RefactoredInitialization] Waiting for dependencies:', missingRequired);
      }
      
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    const stillMissing = requiredDependencies.filter(dep => !window[dep]);
    throw new Error(`Required dependencies not loaded after ${maxAttempts} attempts: ${stillMissing.join(', ')}`);
  }

  /**
   * Setup all refactored services with clean dependency injection
   */
  async setupRefactoredServices() {
    if (!window.RefactoredServices) {
      throw new Error('RefactoredServices not available');
    }
    
    console.log('[RefactoredInitialization] Setting up refactored services...');
    
    this.services = new window.RefactoredServices();
    await this.services.initialize();
    
    // Make services globally available for backward compatibility
    window.refactoredServices = this.services;
    
    console.log('[RefactoredInitialization] Refactored services setup complete');
  }

  /**
   * Initialize UI components
   */
  async initializeUI() {
    console.log('[RefactoredInitialization] Initializing UI components...');
    
    // UI components are already initialized within RefactoredServices
    // This method can be used for additional UI setup if needed
    
    // Ensure proper focus management
    this.setupFocusManagement();
    
    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    console.log('[RefactoredInitialization] UI components initialized');
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Focus chat input when page loads (if configured)
    const chatInput = document.getElementById('chatInput');
    if (chatInput && this.services.configurationPanel.isReady()) {
      setTimeout(() => chatInput.focus(), 100);
    }
    
    // Handle tab navigation improvements
    this.setupTabNavigation();
  }

  /**
   * Setup improved tab navigation
   */
  setupTabNavigation() {
    // Add tab indices to important elements if not already set
    const importantElements = [
      { id: 'configToggle', tabIndex: 1 },
      { id: 'apiProvider', tabIndex: 2 },
      { id: 'apiToken', tabIndex: 3 },
      { id: 'saveConfig', tabIndex: 4 },
      { id: 'chatInput', tabIndex: 5 },
      { id: 'chatSend', tabIndex: 6 },
      { id: 'clearChat', tabIndex: 7 }
    ];
    
    importantElements.forEach(({ id, tabIndex }) => {
      const element = document.getElementById(id);
      if (element && !element.hasAttribute('tabindex')) {
        element.tabIndex = tabIndex;
      }
    });
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to send message
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const chatSend = document.getElementById('chatSend');
        if (chatSend && !chatSend.disabled) {
          chatSend.click();
          e.preventDefault();
        }
      }
      
      // Ctrl/Cmd + K to focus chat input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
          chatInput.focus();
          e.preventDefault();
        }
      }
      
      // Escape to close configuration panel
      if (e.key === 'Escape') {
        const configContent = document.getElementById('configContent');
        if (configContent && configContent.style.display === 'block') {
          this.services.configurationPanel.toggleConfig();
          e.preventDefault();
        }
      }
    });
  }

  /**
   * Setup global event handlers
   */
  setupGlobalEventHandlers() {
    // Handle window resize for responsive layout
    window.addEventListener('resize', this.debounce(() => {
      this.handleWindowResize();
    }, 250));
    
    // Handle visibility change for proper cleanup
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });
    
    // Handle before unload for cleanup
    window.addEventListener('beforeunload', () => {
      this.handleBeforeUnload();
    });
    
    // Global error handler
    window.addEventListener('error', (e) => {
      this.handleGlobalError(e);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      this.handleUnhandledRejection(e);
    });
  }

  /**
   * Handle window resize
   */
  handleWindowResize() {
    // Notify components about resize
    if (this.services && this.services.chatUIManager) {
      this.services.chatUIManager.emit('windowResize', {
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }

  /**
   * Handle visibility change
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is now hidden - pause any ongoing operations
      console.log('[RefactoredInitialization] Page hidden - pausing operations');
    } else {
      // Page is now visible - resume operations
      console.log('[RefactoredInitialization] Page visible - resuming operations');
    }
  }

  /**
   * Handle before unload
   */
  handleBeforeUnload() {
    // Ensure chat history is saved
    if (this.services && this.services.chatUIManager) {
      this.services.chatUIManager.saveChatHistory();
    }
  }

  /**
   * Handle global errors
   */
  handleGlobalError(event) {
    console.error('[RefactoredInitialization] Global error:', event.error);
    
    if (this.services && this.services.notificationSystem) {
      this.services.notificationSystem.showError(
        'An unexpected error occurred. Please refresh the page if issues persist.',
        { autoRemove: false }
      );
    }
  }

  /**
   * Handle unhandled promise rejections
   */
  handleUnhandledRejection(event) {
    console.error('[RefactoredInitialization] Unhandled promise rejection:', event.reason);
    
    if (this.services && this.services.notificationSystem) {
      this.services.notificationSystem.showError(
        'A background operation failed. Please check the console for details.',
        { duration: 8000 }
      );
    }
    
    // Prevent the default unhandled rejection behavior
    event.preventDefault();
  }

  /**
   * Finalize initialization
   */
  async finalizeInitialization() {
    // Show initialization complete notification
    if (this.services && this.services.notificationSystem) {
      this.services.notificationSystem.showSuccess(
        'TypedMind playground ready!',
        { duration: 3000 }
      );
    }
    
    // Emit global initialization complete event
    window.dispatchEvent(new CustomEvent('typedmind:initialized', {
      detail: { services: this.services }
    }));
    
    // Setup any final integrations or callbacks
    this.setupFinalIntegrations();
  }

  /**
   * Setup final integrations
   */
  setupFinalIntegrations() {
    // Monaco editor integration if available
    if (window.monaco && window.editor) {
      console.log('[RefactoredInitialization] Monaco editor detected, setting up integration');
      this.setupMonacoIntegration();
    }
    
    // Add any other final setup steps here
  }

  /**
   * Setup Monaco editor integration
   */
  setupMonacoIntegration() {
    // Listen for editor changes and trigger validation
    if (window.editor && this.services.checkpointManager) {
      let validationTimeout;
      
      window.editor.onDidChangeModelContent(() => {
        // Debounce validation
        clearTimeout(validationTimeout);
        validationTimeout = setTimeout(() => {
          const result = this.services.validateCode();
          if (!result.valid && result.errors.length > 0) {
            console.log('Editor validation errors:', result.errors);
          }
        }, 1000);
      });
    }
  }

  /**
   * Handle initialization errors
   */
  handleInitializationError(error) {
    console.error('[RefactoredInitialization] Fatal initialization error:', error);
    
    // Show error message to user
    const errorMessage = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border: 2px solid #f44336;
        border-radius: 8px;
        padding: 20px;
        max-width: 400px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <h3 style="color: #f44336; margin-top: 0;">Initialization Failed</h3>
        <p>The TypedMind playground failed to initialize properly.</p>
        <p style="font-size: 0.9em; color: #666;">
          Error: ${error.message}
        </p>
        <button onclick="location.reload()" style="
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        ">
          Reload Page
        </button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorMessage);
  }

  /**
   * Utility: Debounce function
   */
  debounce(func, wait) {
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

  /**
   * Get initialization status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      services: this.services ? this.services.getStatus() : null,
      initTime: this.initialized ? Date.now() - this.startTime : null
    };
  }
}

// Initialize when DOM is ready
let refactoredInitialization;

if (typeof window !== 'undefined') {
  // Make classes available globally
  window.RefactoredInitialization = RefactoredInitialization;
  
  // Auto-initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', async () => {
    console.log('[RefactoredInitialization] DOM ready, starting initialization...');
    
    refactoredInitialization = new RefactoredInitialization();
    
    try {
      const services = await refactoredInitialization.initializeRefactored();
      window.refactoredServices = services;
      console.log('[RefactoredInitialization] Application ready');
    } catch (error) {
      console.error('[RefactoredInitialization] Failed to initialize application:', error);
    }
  });
}