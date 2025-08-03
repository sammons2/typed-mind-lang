// EventEmitter - Enhanced event system for decoupled component communication
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * Register an event listener
   */
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
    
    // Return unsubscribe function
    return () => this.off(eventName, callback);
  }

  /**
   * Register a one-time event listener
   */
  once(eventName, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(eventName, onceWrapper);
    };
    return this.on(eventName, onceWrapper);
  }

  /**
   * Remove an event listener
   */
  off(eventName, callback) {
    if (!this.events.has(eventName)) {
      return false;
    }
    
    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(callback);
    
    if (index !== -1) {
      listeners.splice(index, 1);
      
      // Clean up empty event arrays
      if (listeners.length === 0) {
        this.events.delete(eventName);
      }
      return true;
    }
    
    return false;
  }

  /**
   * Emit an event to all registered listeners
   */
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return false;
    }
    
    const listeners = this.events.get(eventName);
    // Create a copy to avoid issues if listeners are modified during emission
    const listenersCopy = [...listeners];
    
    listenersCopy.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event listener for '${eventName}':`, error);
      }
    });
    
    return listenersCopy.length > 0;
  }

  /**
   * Remove all listeners for a specific event or all events
   */
  removeAllListeners(eventName = null) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }

  /**
   * Check if there are listeners for a specific event
   */
  hasListeners(eventName) {
    return this.events.has(eventName) && this.events.get(eventName).length > 0;
  }

  /**
   * Get the number of listeners for a specific event
   */
  listenerCount(eventName) {
    return this.events.has(eventName) ? this.events.get(eventName).length : 0;
  }

  /**
   * Get all event names that have listeners
   */
  eventNames() {
    return Array.from(this.events.keys());
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.EventEmitter = EventEmitter;
}