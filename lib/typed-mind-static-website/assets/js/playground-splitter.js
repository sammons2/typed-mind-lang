/**
 * Playground Splitter - Resizable panels for TypedMind playground
 * Provides draggable splitter functionality between editor and output panels
 */

class PlaygroundSplitter {
  constructor() {
    this.splitter = document.getElementById('verticalSplitter');
    this.editorPanel = document.querySelector('.editor-panel');
    this.outputPanel = document.querySelector('.output-panel');
    this.playgroundMain = document.querySelector('.playground-main');
    
    this.isDragging = false;
    this.startX = 0;
    this.startOutputWidth = 0;
    
    this.minPanelWidth = 200;
    this.defaultOutputWidth = 400;
    this.storageKey = 'typedmind-playground-output-width';
    
    this.init();
  }
  
  init() {
    if (!this.splitter || !this.editorPanel || !this.outputPanel) {
      console.warn('Playground splitter: Required elements not found');
      return;
    }
    
    // Load saved width from localStorage
    this.loadSavedWidth();
    
    // Bind event listeners
    this.bindEvents();
    
    // Handle window resize
    this.handleWindowResize();
  }
  
  loadSavedWidth() {
    const savedWidth = localStorage.getItem(this.storageKey);
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= this.minPanelWidth) {
        this.setOutputPanelWidth(width);
      }
    }
  }
  
  saveWidth(width) {
    localStorage.setItem(this.storageKey, width.toString());
  }
  
  setOutputPanelWidth(width) {
    const containerWidth = this.playgroundMain.clientWidth;
    const splitterWidth = 6; // Width of the splitter
    const maxWidth = containerWidth - this.minPanelWidth - splitterWidth;
    
    // Ensure width is within bounds
    const clampedWidth = Math.max(this.minPanelWidth, Math.min(width, maxWidth));
    
    this.outputPanel.style.width = `${clampedWidth}px`;
    this.outputPanel.style.flexShrink = '0';
    
    // Update editor panel to fill remaining space
    this.editorPanel.style.width = `${containerWidth - clampedWidth - splitterWidth}px`;
    this.editorPanel.style.flexShrink = '0';
    
    return clampedWidth;
  }
  
  bindEvents() {
    // Mouse events
    this.splitter.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // Touch events for mobile (even though splitter is hidden, good to have)
    this.splitter.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Window resize
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    
    // Prevent text selection during drag
    this.splitter.addEventListener('selectstart', (e) => e.preventDefault());
  }
  
  handleMouseDown(e) {
    this.startDrag(e.clientX);
    e.preventDefault();
  }
  
  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.startDrag(e.touches[0].clientX);
      e.preventDefault();
    }
  }
  
  startDrag(clientX) {
    this.isDragging = true;
    this.startX = clientX;
    this.startOutputWidth = this.outputPanel.clientWidth;
    
    // Add dragging class for visual feedback
    this.splitter.classList.add('dragging');
    document.body.classList.add('dragging-splitter');
  }
  
  handleMouseMove(e) {
    if (this.isDragging) {
      this.updateResize(e.clientX);
      e.preventDefault();
    }
  }
  
  handleTouchMove(e) {
    if (this.isDragging && e.touches.length === 1) {
      this.updateResize(e.touches[0].clientX);
      e.preventDefault();
    }
  }
  
  updateResize(clientX) {
    const deltaX = this.startX - clientX; // Reversed because we're resizing from the right
    const newWidth = this.startOutputWidth + deltaX;
    
    const actualWidth = this.setOutputPanelWidth(newWidth);
    
    // Trigger Monaco editor resize if it exists
    this.triggerMonacoResize();
  }
  
  handleMouseUp() {
    this.endDrag();
  }
  
  handleTouchEnd() {
    this.endDrag();
  }
  
  endDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      this.splitter.classList.remove('dragging');
      document.body.classList.remove('dragging-splitter');
      
      // Save the new width
      this.saveWidth(this.outputPanel.clientWidth);
    }
  }
  
  handleWindowResize() {
    // Debounce window resize
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Reset flex properties and recalculate
      this.editorPanel.style.width = '';
      this.editorPanel.style.flexShrink = '';
      this.outputPanel.style.flexShrink = '';
      
      // Re-apply the saved width with new container dimensions
      const currentWidth = this.outputPanel.clientWidth;
      this.setOutputPanelWidth(currentWidth);
      
      // Trigger Monaco editor resize
      this.triggerMonacoResize();
    }, 100);
  }
  
  triggerMonacoResize() {
    // Trigger Monaco editor resize if it exists
    if (typeof window !== 'undefined') {
      const editor = window.typedMindEditor || window.editor;
      if (editor && editor.layout) {
        setTimeout(() => {
          editor.layout();
        }, 10);
      }
    }
  }
  
  // Public method to reset to default width
  resetToDefault() {
    this.setOutputPanelWidth(this.defaultOutputWidth);
    this.saveWidth(this.defaultOutputWidth);
    this.triggerMonacoResize();
  }
  
  // Public method to get current split ratio
  getSplitRatio() {
    const containerWidth = this.playgroundMain.clientWidth;
    const outputWidth = this.outputPanel.clientWidth;
    return outputWidth / containerWidth;
  }
  
  // Public method to set split ratio (0.0 to 1.0)
  setSplitRatio(ratio) {
    const containerWidth = this.playgroundMain.clientWidth;
    const splitterWidth = 6;
    const newWidth = (containerWidth - splitterWidth) * ratio;
    const actualWidth = this.setOutputPanelWidth(newWidth);
    this.saveWidth(actualWidth);
    this.triggerMonacoResize();
  }
}

// Initialize splitter when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit to ensure other scripts have loaded
  setTimeout(() => {
    window.playgroundSplitter = new PlaygroundSplitter();
  }, 100);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlaygroundSplitter;
}