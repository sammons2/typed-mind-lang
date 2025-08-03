// Enhanced Data Transfer Objects for TypedMind Playground
// These provide structured data models with validation and enhanced features

/**
 * Enhanced chat message structure
 */
class ChatMessage {
  constructor(data = {}) {
    this.role = data.role || 'user'; // user | assistant | system
    this.content = data.content || '';
    this.timestamp = data.timestamp || Date.now();
    this.provider = data.provider || null; // openai | anthropic
    this.toolCalls = data.toolCalls || null;
    this.toolResults = data.toolResults || null;
    this.validationResult = data.validationResult || null;
    this.isAutoFix = data.isAutoFix || false;
    this.autoFixAttempt = data.autoFixAttempt || null;
    this.metadata = data.metadata || {};
  }

  /**
   * Validate the chat message structure
   */
  validate() {
    const errors = [];
    
    if (!['user', 'assistant', 'system'].includes(this.role)) {
      errors.push('Invalid role: must be user, assistant, or system');
    }
    
    if (typeof this.content !== 'string') {
      errors.push('Content must be a string');
    }
    
    if (this.content.trim().length === 0) {
      errors.push('Content cannot be empty');
    }
    
    if (!Number.isInteger(this.timestamp) || this.timestamp < 0) {
      errors.push('Timestamp must be a valid positive integer');
    }
    
    if (this.provider && !['openai', 'anthropic'].includes(this.provider)) {
      errors.push('Provider must be openai or anthropic');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get formatted timestamp
   */
  getFormattedTime(options = {}) {
    const date = new Date(this.timestamp);
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    
    return date.toLocaleTimeString(undefined, { ...defaultOptions, ...options });
  }

  /**
   * Get formatted date
   */
  getFormattedDate(options = {}) {
    const date = new Date(this.timestamp);
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return date.toLocaleDateString(undefined, { ...defaultOptions, ...options });
  }

  /**
   * Check if message has code content
   */
  hasCode() {
    return this.content.includes('```') || (this.toolResults && this.toolResults.some(r => r.codeModified));
  }

  /**
   * Extract code blocks from message content
   */
  extractCodeBlocks() {
    const codeBlocks = [];
    const regex = /```(?:typedmind|tmd)?\n?([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(this.content)) !== null) {
      const code = match[1].trim();
      if (code) {
        codeBlocks.push(code);
      }
    }

    return codeBlocks;
  }

  /**
   * Get message preview (truncated content)
   */
  getPreview(maxLength = 100) {
    const content = this.content.replace(/```[\s\S]*?```/g, '[code]').trim();
    return content.length <= maxLength ? content : content.substring(0, maxLength) + '...';
  }

  /**
   * Check if message is from AI assistant
   */
  isFromAssistant() {
    return this.role === 'assistant';
  }

  /**
   * Check if message is from user
   */
  isFromUser() {
    return this.role === 'user';
  }

  /**
   * Serialize to JSON
   */
  toJSON() {
    return {
      role: this.role,
      content: this.content,
      timestamp: this.timestamp,
      provider: this.provider,
      toolCalls: this.toolCalls,
      toolResults: this.toolResults,
      validationResult: this.validationResult,
      isAutoFix: this.isAutoFix,
      autoFixAttempt: this.autoFixAttempt,
      metadata: this.metadata
    };
  }

  /**
   * Create from JSON
   */
  static fromJSON(json) {
    return new ChatMessage(json);
  }

  /**
   * Create a user message
   */
  static createUserMessage(content, metadata = {}) {
    return new ChatMessage({
      role: 'user',
      content,
      metadata
    });
  }

  /**
   * Create an assistant message
   */
  static createAssistantMessage(content, provider, options = {}) {
    return new ChatMessage({
      role: 'assistant',
      content,
      provider,
      ...options
    });
  }
}

/**
 * Enhanced checkpoint structure
 */
class Checkpoint {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.timestamp = data.timestamp || Date.now();
    this.description = data.description || 'Checkpoint';
    this.content = data.content || '';
    this.metadata = {
      triggerType: 'manual', // manual | ai_generated | auto_save | validation_error
      operationType: null, // edit | append | replace | create | delete
      validationStatus: 'unknown', // valid | invalid | unknown
      lineCount: 0,
      characterCount: 0,
      ...data.metadata
    };
    this.tags = data.tags || [];
    this.parentId = data.parentId || null;
  }

  /**
   * Generate unique checkpoint ID
   */
  generateId() {
    return `checkpoint_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate the checkpoint structure
   */
  validate() {
    const errors = [];
    
    if (!this.id || typeof this.id !== 'string') {
      errors.push('Checkpoint ID must be a non-empty string');
    }
    
    if (!Number.isInteger(this.timestamp) || this.timestamp < 0) {
      errors.push('Timestamp must be a valid positive integer');
    }
    
    if (!this.description || typeof this.description !== 'string') {
      errors.push('Description must be a non-empty string');
    }
    
    if (typeof this.content !== 'string') {
      errors.push('Content must be a string');
    }
    
    const validTriggerTypes = ['manual', 'ai_generated', 'auto_save', 'validation_error'];
    if (!validTriggerTypes.includes(this.metadata.triggerType)) {
      errors.push(`Trigger type must be one of: ${validTriggerTypes.join(', ')}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Update metadata with content analysis
   */
  analyzeContent() {
    this.metadata.lineCount = this.content.split('\n').length;
    this.metadata.characterCount = this.content.length;
    
    // Basic validation status
    if (this.content.trim().length === 0) {
      this.metadata.validationStatus = 'unknown';
    } else {
      // This would integrate with actual TypedMind parser
      this.metadata.validationStatus = 'unknown';
    }
  }

  /**
   * Get formatted timestamp
   */
  getFormattedTime(options = {}) {
    const date = new Date(this.timestamp);
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return date.toLocaleString(undefined, { ...defaultOptions, ...options });
  }

  /**
   * Get content preview
   */
  getContentPreview(maxLines = 3, maxChars = 200) {
    const lines = this.content.split('\n').slice(0, maxLines);
    let preview = lines.join('\n');
    
    if (preview.length > maxChars) {
      preview = preview.substring(0, maxChars) + '...';
    }
    
    return {
      preview,
      totalLines: this.content.split('\n').length,
      hasMore: this.content.split('\n').length > maxLines || this.content.length > maxChars
    };
  }

  /**
   * Check if checkpoint is AI-generated
   */
  isAIGenerated() {
    return this.metadata.triggerType === 'ai_generated';
  }

  /**
   * Check if checkpoint is manual
   */
  isManual() {
    return this.metadata.triggerType === 'manual';
  }

  /**
   * Add tag
   */
  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  /**
   * Remove tag
   */
  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  /**
   * Check if has tag
   */
  hasTag(tag) {
    return this.tags.includes(tag);
  }

  /**
   * Serialize to JSON
   */
  toJSON() {
    return {
      id: this.id,
      timestamp: this.timestamp,
      description: this.description,
      content: this.content,
      metadata: this.metadata,
      tags: this.tags,
      parentId: this.parentId
    };
  }

  /**
   * Create from JSON
   */
  static fromJSON(json) {
    return new Checkpoint(json);
  }

  /**
   * Create manual checkpoint
   */
  static createManual(description, content) {
    return new Checkpoint({
      description,
      content,
      metadata: {
        triggerType: 'manual',
        operationType: 'create'
      }
    });
  }

  /**
   * Create AI-generated checkpoint
   */
  static createAI(description, content, operationType = 'edit') {
    return new Checkpoint({
      description,
      content,
      metadata: {
        triggerType: 'ai_generated',
        operationType
      }
    });
  }
}

/**
 * Enhanced validation result structure
 */
class ValidationResult {
  constructor(data = {}) {
    this.valid = data.valid !== undefined ? data.valid : false;
    this.errors = data.errors || [];
    this.warnings = data.warnings || [];
    this.info = data.info || [];
    this.timestamp = data.timestamp || Date.now();
    this.source = data.source || 'unknown'; // parser | linter | custom
    this.metadata = {
      parseTime: null,
      entityCount: 0,
      ruleViolations: [],
      ...data.metadata
    };
  }

  /**
   * Validate the validation result structure
   */
  validate() {
    const errors = [];
    
    if (typeof this.valid !== 'boolean') {
      errors.push('Valid field must be a boolean');
    }
    
    if (!Array.isArray(this.errors)) {
      errors.push('Errors must be an array');
    }
    
    if (!Array.isArray(this.warnings)) {
      errors.push('Warnings must be an array');
    }
    
    if (!Array.isArray(this.info)) {
      errors.push('Info must be an array');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Add error
   */
  addError(error, location = null) {
    const errorObj = {
      message: error,
      location,
      timestamp: Date.now()
    };
    this.errors.push(errorObj);
    this.valid = false;
  }

  /**
   * Add warning
   */
  addWarning(warning, location = null) {
    const warningObj = {
      message: warning,
      location,
      timestamp: Date.now()
    };
    this.warnings.push(warningObj);
  }

  /**
   * Add info
   */
  addInfo(info, location = null) {
    const infoObj = {
      message: info,
      location,
      timestamp: Date.now()
    };
    this.info.push(infoObj);
  }

  /**
   * Get total issue count
   */
  getTotalIssues() {
    return this.errors.length + this.warnings.length;
  }

  /**
   * Get error count
   */
  getErrorCount() {
    return this.errors.length;
  }

  /**
   * Get warning count
   */
  getWarningCount() {
    return this.warnings.length;
  }

  /**
   * Check if has errors
   */
  hasErrors() {
    return this.errors.length > 0;
  }

  /**
   * Check if has warnings
   */
  hasWarnings() {
    return this.warnings.length > 0;
  }

  /**
   * Get severity level
   */
  getSeverity() {
    if (this.hasErrors()) return 'error';
    if (this.hasWarnings()) return 'warning';
    return 'info';
  }

  /**
   * Get formatted summary
   */
  getSummary() {
    if (this.valid && this.errors.length === 0) {
      return 'No validation errors found';
    }
    
    const parts = [];
    if (this.errors.length > 0) {
      parts.push(`${this.errors.length} error(s)`);
    }
    if (this.warnings.length > 0) {
      parts.push(`${this.warnings.length} warning(s)`);
    }
    
    return `Found ${parts.join(' and ')}`;
  }

  /**
   * Get all issues grouped by severity
   */
  getGroupedIssues() {
    return {
      errors: this.errors,
      warnings: this.warnings,
      info: this.info
    };
  }

  /**
   * Filter issues by location
   */
  getIssuesAtLocation(line, column = null) {
    const filter = (issues) => issues.filter(issue => {
      if (!issue.location) return false;
      if (issue.location.line !== line) return false;
      if (column !== null && issue.location.column !== column) return false;
      return true;
    });

    return {
      errors: filter(this.errors),
      warnings: filter(this.warnings),
      info: filter(this.info)
    };
  }

  /**
   * Clear all issues
   */
  clear() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
    this.valid = true;
  }

  /**
   * Merge with another validation result
   */
  merge(other) {
    if (!(other instanceof ValidationResult)) {
      throw new Error('Can only merge with another ValidationResult');
    }

    this.errors = [...this.errors, ...other.errors];
    this.warnings = [...this.warnings, ...other.warnings];
    this.info = [...this.info, ...other.info];
    this.valid = this.valid && other.valid && this.errors.length === 0;
  }

  /**
   * Serialize to JSON
   */
  toJSON() {
    return {
      valid: this.valid,
      errors: this.errors,
      warnings: this.warnings,
      info: this.info,
      timestamp: this.timestamp,
      source: this.source,
      metadata: this.metadata
    };
  }

  /**
   * Create from JSON
   */
  static fromJSON(json) {
    return new ValidationResult(json);
  }

  /**
   * Create successful validation result
   */
  static createSuccess(entityCount = 0) {
    return new ValidationResult({
      valid: true,
      metadata: {
        entityCount
      }
    });
  }

  /**
   * Create failed validation result
   */
  static createFailure(errors = []) {
    const result = new ValidationResult({
      valid: false
    });
    
    errors.forEach(error => {
      result.addError(error);
    });
    
    return result;
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.ChatMessage = ChatMessage;
  window.Checkpoint = Checkpoint;
  window.ValidationResult = ValidationResult;
}