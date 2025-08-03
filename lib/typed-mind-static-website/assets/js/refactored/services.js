// RefactoredServices - Consolidated services with clean separation of concerns
class RefactoredServices {
  constructor() {
    this.tokenManager = null;
    this.checkpointManager = null;
    this.chatService = null;
    this.notificationSystem = null;
    this.configurationPanel = null;
    this.chatUIManager = null;
    this.editorPanel = null;
    
    this.initialized = false;
    this.initPromise = null;
  }

  /**
   * Initialize all services with dependency injection
   */
  async initialize() {
    if (this.initialized) {
      return this;
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
      console.log('[RefactoredServices] Starting initialization...');
      
      // Initialize core services first
      await this.initializeCoreServices();
      
      // Initialize UI components with service dependencies
      await this.initializeUIComponents();
      
      // Setup cross-component event bindings
      this.setupEventBindings();
      
      this.initialized = true;
      console.log('[RefactoredServices] All services initialized successfully');
      
      return this;
    } catch (error) {
      console.error('[RefactoredServices] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Initialize core services (non-UI)
   */
  async initializeCoreServices() {
    // Token Manager
    if (window.TokenManager) {
      this.tokenManager = new window.TokenManager();
      await this.tokenManager.initialize();
      console.log('[RefactoredServices] TokenManager initialized');
    } else {
      throw new Error('TokenManager not available');
    }

    // Checkpoint Manager (if available)
    if (window.CodeCheckpointManager) {
      this.checkpointManager = new window.CodeCheckpointManager();
      console.log('[RefactoredServices] CheckpointManager initialized');
    } else {
      console.warn('[RefactoredServices] CheckpointManager not available');
    }

    // Chat Service
    if (window.ChatService) {
      this.chatService = new window.ChatService(this.tokenManager, this.checkpointManager);
      console.log('[RefactoredServices] ChatService initialized');
    } else {
      throw new Error('ChatService not available');
    }

    // Notification System
    if (window.NotificationSystem) {
      this.notificationSystem = new window.NotificationSystem({
        position: 'top-right',
        maxNotifications: 5
      });
      console.log('[RefactoredServices] NotificationSystem initialized');
    } else {
      throw new Error('NotificationSystem not available');
    }
  }

  /**
   * Initialize UI components with service dependencies
   */
  async initializeUIComponents() {
    // Configuration Panel
    if (window.ConfigurationPanel) {
      this.configurationPanel = new window.ConfigurationPanel(
        this.tokenManager,
        this,
        {
          autoHideOnSave: true,
          validateOnChange: true
        }
      );
      console.log('[RefactoredServices] ConfigurationPanel initialized');
    } else {
      throw new Error('ConfigurationPanel not available');
    }

    // Chat UI Manager
    if (window.ChatUIManager) {
      this.chatUIManager = new window.ChatUIManager(
        this,
        {
          autoSave: true,
          showTimestamps: true,
          enableMarkdown: true
        }
      );
      console.log('[RefactoredServices] ChatUIManager initialized');
    } else {
      throw new Error('ChatUIManager not available');
    }

    // Editor Panel (if available)
    if (window.EditorPanel) {
      this.editorPanel = new window.EditorPanel(
        this,
        {
          autoValidate: true,
          showProblems: true
        }
      );
      console.log('[RefactoredServices] EditorPanel initialized');
    } else {
      console.warn('[RefactoredServices] EditorPanel not available');
    }
  }

  /**
   * Setup cross-component event bindings
   */
  setupEventBindings() {
    // Configuration changes should update chat state
    if (this.configurationPanel && this.chatUIManager) {
      this.configurationPanel.on('configurationSaved', (config) => {
        this.chatUIManager.updateChatState(true);
        this.notificationSystem.showSuccess(`${config.provider} configuration saved`);
      });

      this.configurationPanel.on('configurationCleared', (config) => {
        this.chatUIManager.updateChatState(false);
      });
    }

    // Chat events for checkpoint management
    if (this.chatUIManager && this.checkpointManager) {
      this.chatUIManager.on('messageSent', (data) => {
        // Create checkpoint when AI provides code
        if (data.response.toolResults && data.response.toolResults.some(r => r.codeModified)) {
          const description = `Chat: ${data.userMessage.content.substring(0, 50)}...`;
          this.checkpointManager.createAICheckpoint(description, 'chat', 'ai_response');
        }
      });
    }

    // Editor changes for validation
    if (this.editorPanel && this.checkpointManager) {
      this.editorPanel.on('codeChanged', () => {
        // Debounced validation can be handled here
      });
    }

    console.log('[RefactoredServices] Event bindings setup complete');
  }

  /**
   * Send message through chat service
   */
  async sendMessage(message, provider, conversationHistory = []) {
    if (!this.chatService) {
      throw new Error('ChatService not initialized');
    }
    
    return await this.chatService.sendMessage(message, provider, conversationHistory);
  }

  /**
   * Encrypt and store API token
   */
  async encryptToken(token, provider) {
    if (!this.tokenManager) {
      throw new Error('TokenManager not initialized');
    }
    
    return await this.tokenManager.encryptToken(token, provider);
  }

  /**
   * Decrypt and retrieve API token
   */
  async decryptToken(provider) {
    if (!this.tokenManager) {
      throw new Error('TokenManager not initialized');
    }
    
    return await this.tokenManager.decryptToken(provider);
  }

  /**
   * Check if token exists for provider
   */
  hasToken(provider) {
    if (!this.tokenManager) {
      return false;
    }
    
    return this.tokenManager.hasToken(provider);
  }

  /**
   * Validate API token
   */
  async validateToken(token, provider) {
    if (!this.chatService) {
      throw new Error('ChatService not initialized');
    }
    
    return await this.chatService.testToken(provider);
  }

  /**
   * Create checkpoint
   */
  createCheckpoint(description, metadata = {}) {
    if (!this.checkpointManager) {
      throw new Error('CheckpointManager not available');
    }
    
    return this.checkpointManager.createCheckpoint(description, metadata);
  }

  /**
   * Restore checkpoint
   */
  restoreCheckpoint(checkpointId) {
    if (!this.checkpointManager) {
      throw new Error('CheckpointManager not available');
    }
    
    return this.checkpointManager.restoreCheckpoint(checkpointId);
  }

  /**
   * Validate current code
   */
  validateCode(code = null) {
    if (!this.checkpointManager) {
      return {
        valid: true,
        errors: [],
        warnings: [],
        message: 'Validation not available'
      };
    }
    
    return this.checkpointManager.validateCurrentCode();
  }

  /**
   * Parse TypedMind code
   */
  parseCode(code) {
    // This would integrate with the TypedMind parser
    // For now, delegate to checkpoint manager validation
    return this.validateCode(code);
  }

  /**
   * Extract entities from parsed code
   */
  extractEntities(parseResult) {
    // This would extract entities from the parse result
    // Implementation depends on the TypedMind parser structure
    return [];
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info', options = {}) {
    if (!this.notificationSystem) {
      console.log(`[Notification ${type.toUpperCase()}] ${message}`);
      return;
    }
    
    return this.notificationSystem.showNotification(message, type, options);
  }

  /**
   * Show success notification
   */
  showSuccess(message, options = {}) {
    return this.showNotification(message, 'success', options);
  }

  /**
   * Show error notification
   */
  showError(message, options = {}) {
    return this.showNotification(message, 'error', options);
  }

  /**
   * Show warning notification
   */
  showWarning(message, options = {}) {
    return this.showNotification(message, 'warning', options);
  }

  /**
   * Show info notification
   */
  showInfo(message, options = {}) {
    return this.showNotification(message, 'info', options);
  }

  /**
   * Get current configuration state
   */
  getConfiguration() {
    if (!this.configurationPanel) {
      return {
        provider: 'openai',
        isConfigured: false,
        hasToken: false
      };
    }
    
    return this.configurationPanel.getConfiguration();
  }

  /**
   * Check if services are ready for chat
   */
  isReady() {
    return this.initialized && 
           this.configurationPanel && 
           this.configurationPanel.isReady() &&
           this.chatUIManager &&
           this.chatService;
  }

  /**
   * Get service status for debugging
   */
  getStatus() {
    return {
      initialized: this.initialized,
      tokenManager: !!this.tokenManager,
      checkpointManager: !!this.checkpointManager,
      chatService: !!this.chatService,
      notificationSystem: !!this.notificationSystem,
      configurationPanel: !!this.configurationPanel,
      chatUIManager: !!this.chatUIManager,
      editorPanel: !!this.editorPanel,
      isReady: this.isReady()
    };
  }

  /**
   * Clean up all services
   */
  destroy() {
    const components = [
      this.chatUIManager,
      this.editorPanel,
      this.configurationPanel,
      this.notificationSystem
    ];
    
    components.forEach(component => {
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
    });
    
    // Clear references
    this.tokenManager = null;
    this.checkpointManager = null;
    this.chatService = null;
    this.notificationSystem = null;
    this.configurationPanel = null;
    this.chatUIManager = null;
    this.editorPanel = null;
    
    this.initialized = false;
    this.initPromise = null;
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.RefactoredServices = RefactoredServices;
}