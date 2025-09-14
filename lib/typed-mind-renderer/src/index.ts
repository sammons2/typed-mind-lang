// @ts-nocheck
/**
 * TypedMind Renderer - Main Entry Point
 * Exports both the original renderer and the new advanced renderer
 */

// Export original renderer for backward compatibility
export { TypedMindRenderer } from './enhanced-index';

// Export advanced renderer as the main export
export { AdvancedTypedMindRenderer } from './advanced-renderer';

// Export all advanced system components for granular usage
export {
  VirtualizationManager,
  PerformanceMonitor,
  LevelOfDetailManager,
  type ViewportInfo,
  type SpatialItem,
} from './performance/spatial-index';

export {
  ValidationErrorProcessor,
  ErrorVisualizationRenderer,
  type EnhancedValidationError,
  type ErrorSeverity,
} from './validation/error-visualization';

export {
  PluginManager,
  BuiltInPluginRegistry,
  type Plugin,
  type EntityRendererPlugin,
  type LayoutPlugin,
  type InteractionPlugin,
  type DataProcessorPlugin,
  type ThemePlugin,
  type ExportPlugin,
  type PluginContext,
} from './plugins/plugin-system';

export {
  GraphMetricsAnalyzer,
  type HealthScore,
  type MetricCategory,
  type Metric,
  type Recommendation,
  type Risk,
} from './metrics/graph-metrics';

export {
  PatternRecognitionEngine,
  type ArchitecturalPattern,
  type PatternVisualization,
  type PatternMatcher,
  type PatternRecommendation,
} from './patterns/pattern-recognition';

export {
  ArchitectureDiffAnalyzer,
  type ArchitectureDiff,
  type EntityDiff,
  type DiffOptions,
  type DiffChangeType,
  type DiffSummary,
} from './diff/diff-visualization';

export {
  CodeGenerationEngine,
  type CodeGenConfig,
  type GeneratedCode,
  type CodePreview,
  type TargetLanguage,
  type TargetFramework,
} from './codegen/code-generation';

// Re-export enhanced renderer options for convenience
export type { EnhancedRendererOptions } from './enhanced-index';

// Type-only exports for advanced configuration
export type AdvancedRendererOptions = {
  // Basic options
  port?: number;
  host?: string;
  openBrowser?: boolean;

  // Performance options
  enableVirtualization?: boolean;
  maxRenderItems?: number;
  enableSpatialIndexing?: boolean;
  performanceMonitoring?: boolean;

  // Feature toggles
  enableErrorVisualization?: boolean;
  enablePluginSystem?: boolean;
  enableMetricsDashboard?: boolean;
  enablePatternRecognition?: boolean;
  enableDiffMode?: boolean;
  enableCodeGeneration?: boolean;

  // Visualization options
  enableDeepLinking?: boolean;
  enablePrintMode?: boolean;
  enableThemeSystem?: boolean;
  enableTelemetry?: boolean;

  // Advanced features
  enableProgressiveEnhancement?: boolean;
  enableClientSideCaching?: boolean;
  enableComprehensiveErrorHandling?: boolean;

  // Customization
  customPlugins?: Plugin[];
  themePreference?: 'dark' | 'light' | 'auto' | 'high-contrast' | 'colorblind-friendly';
  defaultCodeGenLanguage?: 'typescript' | 'javascript' | 'python' | 'java';
};

// Default export is the advanced renderer
export { AdvancedTypedMindRenderer as default } from './advanced-renderer';
