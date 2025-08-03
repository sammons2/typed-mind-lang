// Code Checkpoint Manager - Manages code snapshots and version history
class CodeCheckpointManager {
  constructor() {
    this.checkpoints = [];
    this.maxCheckpoints = 50; // Limit to prevent localStorage overflow
    this.storageKey = 'typedmind_code_checkpoints';
    this.currentCheckpointId = null;
    
    this.loadCheckpoints();
  }

  /**
   * Create a new checkpoint with the current editor content
   */
  createCheckpoint(description = 'Manual checkpoint', metadata = {}) {
    if (!window.typedMindEditor) {
      throw new Error('Monaco editor not available');
    }

    const content = window.typedMindEditor.getValue();
    const checkpoint = {
      id: this.generateId(),
      timestamp: Date.now(),
      description: description,
      content: content,
      metadata: {
        triggerType: metadata.triggerType || 'manual',
        aiProvider: metadata.aiProvider || null,
        validationStatus: metadata.validationStatus || 'unknown',
        ...metadata
      }
    };

    // Add to beginning of array (most recent first)
    this.checkpoints.unshift(checkpoint);
    
    // Trim to max checkpoints
    if (this.checkpoints.length > this.maxCheckpoints) {
      this.checkpoints = this.checkpoints.slice(0, this.maxCheckpoints);
    }

    this.currentCheckpointId = checkpoint.id;
    this.saveCheckpoints();
    
    return checkpoint;
  }

  /**
   * Create checkpoint specifically for AI code edits
   */
  createAICheckpoint(description, aiProvider, operationType = 'edit') {
    return this.createCheckpoint(description, {
      triggerType: 'ai_edit',
      aiProvider: aiProvider,
      operationType: operationType
    });
  }

  /**
   * Restore editor content to a specific checkpoint
   */
  restoreCheckpoint(checkpointId) {
    const checkpoint = this.getCheckpoint(checkpointId);
    if (!checkpoint) {
      throw new Error(`Checkpoint ${checkpointId} not found`);
    }

    if (!window.typedMindEditor) {
      throw new Error('Monaco editor not available');
    }

    // Set editor content
    window.typedMindEditor.setValue(checkpoint.content);
    this.currentCheckpointId = checkpointId;

    // Trigger validation if available
    this.validateCurrentCode();

    return checkpoint;
  }

  /**
   * Get a specific checkpoint by ID
   */
  getCheckpoint(checkpointId) {
    return this.checkpoints.find(cp => cp.id === checkpointId);
  }

  /**
   * Get all checkpoints (most recent first)
   */
  getAllCheckpoints() {
    return [...this.checkpoints];
  }

  /**
   * Get recent checkpoints (last N)
   */
  getRecentCheckpoints(count = 10) {
    return this.checkpoints.slice(0, count);
  }

  /**
   * Delete a specific checkpoint
   */
  deleteCheckpoint(checkpointId) {
    const index = this.checkpoints.findIndex(cp => cp.id === checkpointId);
    if (index === -1) {
      throw new Error(`Checkpoint ${checkpointId} not found`);
    }

    this.checkpoints.splice(index, 1);
    this.saveCheckpoints();
    
    // If we deleted the current checkpoint, reset it
    if (this.currentCheckpointId === checkpointId) {
      this.currentCheckpointId = this.checkpoints.length > 0 ? this.checkpoints[0].id : null;
    }
  }

  /**
   * Clear all checkpoints
   */
  clearAllCheckpoints() {
    this.checkpoints = [];
    this.currentCheckpointId = null;
    this.saveCheckpoints();
  }

  /**
   * Get diff between two checkpoints
   */
  getDiff(fromCheckpointId, toCheckpointId) {
    const fromCheckpoint = this.getCheckpoint(fromCheckpointId);
    const toCheckpoint = this.getCheckpoint(toCheckpointId);
    
    if (!fromCheckpoint || !toCheckpoint) {
      throw new Error('One or both checkpoints not found');
    }

    // Simple diff implementation - could be enhanced with a proper diff library
    return {
      from: {
        id: fromCheckpoint.id,
        description: fromCheckpoint.description,
        timestamp: fromCheckpoint.timestamp
      },
      to: {
        id: toCheckpoint.id,
        description: toCheckpoint.description,
        timestamp: toCheckpoint.timestamp
      },
      contentChanged: fromCheckpoint.content !== toCheckpoint.content,
      lineCount: {
        from: fromCheckpoint.content.split('\n').length,
        to: toCheckpoint.content.split('\n').length
      }
    };
  }

  /**
   * Get preview of checkpoint content (first few lines)
   */
  getCheckpointPreview(checkpointId, maxLines = 5) {
    const checkpoint = this.getCheckpoint(checkpointId);
    if (!checkpoint) {
      return null;
    }

    const lines = checkpoint.content.split('\n');
    const preview = lines.slice(0, maxLines).join('\n');
    const hasMore = lines.length > maxLines;
    
    return {
      preview: preview,
      hasMore: hasMore,
      totalLines: lines.length
    };
  }

  /**
   * Validate current editor content using TypedMind parser
   */
  validateCurrentCode() {
    if (!window.typedMindEditor || !window.TypedMindParser) {
      return { valid: false, errors: ['Parser not available'] };
    }

    try {
      const content = window.typedMindEditor.getValue();
      const parser = new window.TypedMindParser();
      const result = parser.parse(content);
      
      return {
        valid: result.errors.length === 0,
        errors: result.errors || [],
        warnings: result.warnings || [],
        entities: result.entities ? result.entities.size : 0
      };
    } catch (error) {
      return {
        valid: false,
        errors: [`Parser error: ${error.message}`]
      };
    }
  }

  /**
   * Update checkpoint validation status
   */
  updateCheckpointValidation(checkpointId, validationResult) {
    const checkpoint = this.getCheckpoint(checkpointId);
    if (checkpoint) {
      checkpoint.metadata.validationStatus = validationResult.valid ? 'valid' : 'invalid';
      checkpoint.metadata.validationErrors = validationResult.errors || [];
      checkpoint.metadata.validationWarnings = validationResult.warnings || [];
      this.saveCheckpoints();
    }
  }

  /**
   * Export checkpoints to JSON
   */
  exportCheckpoints() {
    return JSON.stringify({
      checkpoints: this.checkpoints,
      currentCheckpointId: this.currentCheckpointId,
      exportTimestamp: Date.now(),
      version: '1.0'
    }, null, 2);
  }

  /**
   * Import checkpoints from JSON
   */
  importCheckpoints(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.checkpoints && Array.isArray(data.checkpoints)) {
        this.checkpoints = data.checkpoints;
        this.currentCheckpointId = data.currentCheckpointId || null;
        this.saveCheckpoints();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import checkpoints:', error);
      return false;
    }
  }

  /**
   * Load checkpoints from localStorage
   */
  loadCheckpoints() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.checkpoints = data.checkpoints || [];
        this.currentCheckpointId = data.currentCheckpointId || null;
      }
    } catch (error) {
      console.error('Failed to load checkpoints:', error);
      this.checkpoints = [];
      this.currentCheckpointId = null;
    }
  }

  /**
   * Save checkpoints to localStorage
   */
  saveCheckpoints() {
    try {
      const data = {
        checkpoints: this.checkpoints,
        currentCheckpointId: this.currentCheckpointId,
        lastSaved: Date.now()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save checkpoints:', error);
      // If localStorage is full, remove oldest checkpoints and try again
      if (error.name === 'QuotaExceededError') {
        this.checkpoints = this.checkpoints.slice(0, Math.floor(this.maxCheckpoints / 2));
        try {
          localStorage.setItem(this.storageKey, JSON.stringify({
            checkpoints: this.checkpoints,
            currentCheckpointId: this.currentCheckpointId,
            lastSaved: Date.now()
          }));
        } catch (retryError) {
          console.error('Failed to save checkpoints after cleanup:', retryError);
        }
      }
    }
  }

  /**
   * Generate unique ID for checkpoints
   */
  generateId() {
    return `cp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get checkpoint statistics
   */
  getStats() {
    const totalCheckpoints = this.checkpoints.length;
    const aiCheckpoints = this.checkpoints.filter(cp => cp.metadata.triggerType === 'ai_edit').length;
    const manualCheckpoints = totalCheckpoints - aiCheckpoints;
    
    const validCheckpoints = this.checkpoints.filter(cp => 
      cp.metadata.validationStatus === 'valid'
    ).length;
    
    const oldestTimestamp = totalCheckpoints > 0 ? 
      this.checkpoints[totalCheckpoints - 1].timestamp : null;
    const newestTimestamp = totalCheckpoints > 0 ? 
      this.checkpoints[0].timestamp : null;

    return {
      total: totalCheckpoints,
      aiGenerated: aiCheckpoints,
      manual: manualCheckpoints,
      valid: validCheckpoints,
      oldest: oldestTimestamp,
      newest: newestTimestamp,
      currentId: this.currentCheckpointId
    };
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.CodeCheckpointManager = CodeCheckpointManager;
}