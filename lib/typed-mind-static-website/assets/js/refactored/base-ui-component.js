// BaseUIComponent - Base component class with enhanced lifecycle and state management
class BaseUIComponent extends EventEmitter {
  constructor(elementId = null, config = {}) {
    super();
    
    this.elementId = elementId;
    this.element = null;
    this.state = {};
    this.config = { ...this.getDefaultConfig(), ...config };
    this.isDestroyed = false;
    this.eventListeners = [];
    
    // Auto-initialize if elementId is provided
    if (elementId) {
      this.element = document.getElementById(elementId);
      if (!this.element) {
        console.warn(`Element with ID '${elementId}' not found`);
      }
    }
  }

  /**
   * Get default configuration - override in subclasses
   */
  getDefaultConfig() {
    return {};
  }

  /**
   * Initialize the component - override in subclasses
   */
  async initialize() {
    if (this.isDestroyed) {
      throw new Error('Cannot initialize destroyed component');
    }
    
    this.bindEvents();
    this.render();
    this.emit('initialized');
  }

  /**
   * Render the component - override in subclasses
   */
  render() {
    // Base implementation does nothing
    // Subclasses should implement their rendering logic
    this.emit('render');
  }

  /**
   * Bind event listeners - override in subclasses
   */
  bindEvents() {
    // Base implementation does nothing
    // Subclasses should implement their event binding logic
  }

  /**
   * Clean up event listeners and references
   */
  cleanup() {
    // Remove DOM event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];

    // Remove all event emitter listeners
    this.removeAllListeners();
    
    this.emit('cleanup');
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.isDestroyed) {
      return;
    }
    
    this.cleanup();
    this.isDestroyed = true;
    this.element = null;
    this.state = {};
    
    this.emit('destroyed');
  }

  /**
   * Set component state and trigger re-render if needed
   */
  setState(newState, shouldRender = true) {
    if (this.isDestroyed) {
      console.warn('Attempted to set state on destroyed component');
      return;
    }
    
    const oldState = { ...this.state };
    this.state = { ...this.state, ...newState };
    
    this.emit('stateChange', { oldState, newState: this.state });
    
    if (shouldRender) {
      this.render();
    }
  }

  /**
   * Get current component state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update state without triggering re-render
   */
  updateState(newState) {
    this.setState(newState, false);
  }

  /**
   * Get config value
   */
  getConfig(key, defaultValue = null) {
    return this.config[key] !== undefined ? this.config[key] : defaultValue;
  }

  /**
   * Update config
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.emit('configChange', this.config);
  }

  /**
   * Add a DOM event listener and track it for cleanup
   */
  addDOMListener(element, event, handler, options = false) {
    if (this.isDestroyed) {
      return;
    }
    
    element.addEventListener(event, handler, options);
    this.eventListeners.push({ element, event, handler, options });
  }

  /**
   * Remove a specific DOM event listener
   */
  removeDOMListener(element, event, handler) {
    element.removeEventListener(event, handler);
    
    // Remove from tracking
    this.eventListeners = this.eventListeners.filter(listener => 
      !(listener.element === element && listener.event === event && listener.handler === handler)
    );
  }

  /**
   * Show the component
   */
  show() {
    if (this.element) {
      this.element.style.display = this.getConfig('displayStyle', 'block');
      this.setState({ visible: true });
      this.emit('show');
    }
  }

  /**
   * Hide the component
   */
  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.setState({ visible: false });
      this.emit('hide');
    }
  }

  /**
   * Toggle component visibility
   */
  toggle() {
    if (this.getState().visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Check if component is visible
   */
  isVisible() {
    return this.getState().visible || false;
  }

  /**
   * Enable the component
   */
  enable() {
    this.setState({ disabled: false });
    this.emit('enable');
  }

  /**
   * Disable the component
   */
  disable() {
    this.setState({ disabled: true });
    this.emit('disable');
  }

  /**
   * Check if component is enabled
   */
  isEnabled() {
    return !this.getState().disabled;
  }

  /**
   * Utility method to escape HTML
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Utility method to create DOM elements
   */
  createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (content) {
      element.innerHTML = content;
    }
    
    return element;
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.BaseUIComponent = BaseUIComponent;
}