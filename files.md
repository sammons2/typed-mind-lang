# Project Files Documentation

| Path | Description |
|------|-------------|
| .claude/settings.local.json | Claude Code local settings file defining allowed bash commands and permissions |
| .gitignore | Git ignore file excluding node_modules, dist, logs, and other generated/temporary files |
| eslint.config.js | ESLint configuration using TypeScript ESLint with Prettier integration and standard rules |
| examples/README.md | Documentation file explaining TypedMind DSL examples and their usage |
| examples/comment-example.tmd | Example demonstrating comment functionality with inline and continuation comments |
| examples/dto-example.tmd | Example showcasing DTO definitions with field types and validation workflows |
| examples/example-fixed.tmd | Clean architecture example with proper composition patterns and complete entity relationships |
| examples/example-rendered.html | Interactive HTML visualization of the TypedMind architecture using D3.js force-directed graph |
| examples/example-with-methods.tmd | Example showing method implementation details and service layer patterns |
| examples/example.tmd | Main comprehensive example demonstrating complete todo application architecture using composition |
| examples/imports/main.tmd | Main application file that imports and orchestrates authentication, database, and UI components with a startApp function |
| examples/imports/shared/auth.tmd | Authentication module defining login/logout services and user credential handling |
| examples/imports/shared/database.tmd | Database module providing connection management and query execution functionality |
| examples/imports/ui/components.tmd | UI components module exporting reusable Button, Modal, Input, and Form components |
| examples/rendered-example.html | Interactive HTML visualization with errors highlighting orphaned entities in the architecture |
| examples/runparameter-example.tmd | Example demonstrating RunParameter usage for environment variables, IAM roles, and runtime configuration |
| lib/typed-mind-cli/.npmignore | NPM ignore file specifying build artifacts, tests, and config files to exclude from package publishing |
| lib/typed-mind-cli/README.md | README documentation for the TypedMind CLI package explaining installation, usage, and purpose |
| lib/typed-mind-cli/package.json | Package.json configuration for the TypedMind CLI NPM package with dependencies and build scripts |
| lib/typed-mind-cli/program.tmd | TypedMind DSL program file defining the CLI architecture with main and showHelp functions |
| lib/typed-mind-cli/src/cli.ts | Main CLI implementation with argument parsing, file validation, and rendering capabilities using Node.js built-in utilities |
| lib/typed-mind-cli/src/index.ts | Simple re-export module exposing TypedMind core and renderer functionality |
| lib/typed-mind-cli/tsconfig.json | TypeScript configuration extending root config with CLI-specific build settings and project references |
| lib/typed-mind-cli/tsup.config.ts | Tsup build configuration for bundling the CLI with CommonJS format and executable banner |
| lib/typed-mind-lsp/.npmignore | NPM ignore file specifying which files to exclude from the published package |
| lib/typed-mind-lsp/README.md | README documentation for the TypedMind Language Server Protocol implementation |
| lib/typed-mind-lsp/package.json | Package.json configuration for the TypedMind LSP npm package with dependencies and scripts |
| lib/typed-mind-lsp/program.tmd | TypedMind DSL file describing the LSP server's architecture and startup function |
| lib/typed-mind-lsp/src/cli.ts | CLI entry point script that starts the TypedMind Language Server |
| lib/typed-mind-lsp/src/index.ts | Main module exports exposing the TypedMindLanguageServer class and startServer function |
| lib/typed-mind-lsp/src/server.test.ts | Unit tests for the TypedMindLanguageServer using Vitest testing framework |
| lib/typed-mind-lsp/src/server.ts | Main Language Server Protocol implementation providing IDE features for TypedMind DSL files |
| lib/typed-mind-lsp/src/start-server.ts | Simple server startup function that creates and starts a TypedMindLanguageServer instance |
| lib/typed-mind-lsp/tsconfig.json | TypeScript configuration extending parent config with composite compilation settings |
| lib/typed-mind-lsp/tsup.config.ts | TSup bundler configuration for building both index and CLI entry points |
| lib/typed-mind-renderer/.npmignore | Specifies files and patterns to exclude from npm package distribution |
| lib/typed-mind-renderer/README.md | Package README describing an interactive HTML/D3.js renderer for TypedMind DSL visualizations |
| lib/typed-mind-renderer/package.json | Package configuration for TypedMind renderer with build scripts and dependencies |
| lib/typed-mind-renderer/program.tmd | TypedMind DSL program defining the renderer application structure and component relationships |
| lib/typed-mind-renderer/src/index.ts | Main TypedMindRenderer class implementation with HTTP server and static HTML generation |
| lib/typed-mind-renderer/src/static/index.html | HTML template with dark theme styling for interactive TypedMind architecture visualization |
| lib/typed-mind-renderer/tsconfig.json | TypeScript configuration extending parent config with composite compilation references |
| lib/typed-mind-renderer/tsup.config.ts | TSUP build configuration for CommonJS output with TypeScript declarations |
| lib/typed-mind-static-website/.github/workflows/deploy.yml | GitHub Actions workflow for automatic deployment to GitHub Pages when main branch changes |
| lib/typed-mind-static-website/DEPLOY.md | Comprehensive deployment guide with setup instructions for GitHub Pages and troubleshooting tips |
| lib/typed-mind-static-website/README.md | Project overview and README with features, development setup, and deployment instructions for TypedMind playground |
| lib/typed-mind-static-website/REFACTORING_SUMMARY.md | Detailed refactoring summary documenting transformation from monolithic to modular component-based architecture |
| lib/typed-mind-static-website/assets/css/playground.css | Playground-specific CSS defining editor layout, panels, chat interface, and interactive development environment |
| lib/typed-mind-static-website/assets/css/styles.css | Main theme and component styles for the TypedMind static website including responsive design and dark mode support |
| lib/typed-mind-static-website/assets/js/chat-service.js | Service class that handles AI chat functionality with OpenAI/Claude APIs, including tool execution and validation |
| lib/typed-mind-static-website/assets/js/chat-ui.js | User interface management class for the AI chat assistant with conversation history and configuration |
| lib/typed-mind-static-website/assets/js/code-checkpoint-manager.js | Code checkpoint management system for creating, restoring, and validating TypedMind code snapshots |
| lib/typed-mind-static-website/assets/js/main.js | Main website JavaScript handling theme toggle, navigation, tabs, and syntax highlighting examples |
| lib/typed-mind-static-website/assets/js/playground-examples-standalone.js | Standalone version of playground examples for use in playground.html without ES6 modules |
| lib/typed-mind-static-website/assets/js/playground-examples.js | Static examples collection for both longform and shortform TypedMind syntax variants |
| lib/typed-mind-static-website/assets/js/playground-splitter.js | Resizable panel splitter implementation for the TypedMind playground editor and output views |
| lib/typed-mind-static-website/assets/js/refactored/base-ui-component.js | Base component class with enhanced lifecycle management, state handling, and utility methods for UI components |
| lib/typed-mind-static-website/assets/js/refactored/chat-ui-manager.js | Refactored chat interface manager that handles message display, user input, AI responses, and conversation history |
| lib/typed-mind-static-website/assets/js/refactored/configuration-panel.js | Enhanced configuration panel that manages API provider settings, token validation, and secure storage |
| lib/typed-mind-static-website/assets/js/refactored/dtos.js | Structured data transfer objects for chat messages, checkpoints, and validation results with full CRUD operations |
| lib/typed-mind-static-website/assets/js/refactored/event-emitter.js | Simple event emitter implementation with registration, emission, and cleanup capabilities for component communication |
| lib/typed-mind-static-website/assets/js/refactored/initialization.js | Application initialization system that handles dependency loading, service setup, and global event management |
| lib/typed-mind-static-website/assets/js/refactored/notification-system.js | Centralized notification system that displays success/error/warning messages with animations and auto-removal |
| lib/typed-mind-static-website/assets/js/refactored/services.js | Consolidated service container that manages all application services with dependency injection and cross-component communication |
| lib/typed-mind-static-website/assets/js/token-manager.js | Secure API token storage manager using Web Crypto API with localStorage fallback |
| lib/typed-mind-static-website/assets/js/typedmind-monaco-simple.js | Monaco Editor language support and integration for TypedMind with syntax highlighting and validation |
| lib/typed-mind-static-website/assets/js/typedmind-parser-browser.js | Browser-compatible TypedMind parser for parsing both longform and shortform syntax variants |
| lib/typed-mind-static-website/build.js | Node.js build script that copies source files, assets, and TypedMind library files to dist directory |
| lib/typed-mind-static-website/monorepo-program.tmd | TypedMind program definition describing the static website architecture and component relationships |
| lib/typed-mind-static-website/package-lock.json | NPM lockfile containing dependency version information and integrity hashes for reproducible builds |
| lib/typed-mind-static-website/package.json | NPM package configuration with build, serve, and deploy scripts for the static website |
| lib/typed-mind-static-website/serve.js | Simple HTTP development server for serving the built static files locally on port 8080 |
| lib/typed-mind-static-website/src/.nojekyll | Empty file that disables Jekyll processing for GitHub Pages |
| lib/typed-mind-static-website/src/index.html | Main TypedMind website homepage with DSL documentation and feature showcase |
| lib/typed-mind-static-website/src/playground.html | Interactive TypedMind playground with Monaco editor and AI assistant integration |
| lib/typed-mind-static-website/src/refactored-playground.html | Refactored version of the playground with improved architecture and additional features |
| lib/typed-mind-static-website/src/robots.txt | Robots.txt file allowing all web crawlers and AI bots to index the site |
| lib/typed-mind-static-website/test-chat.html | Test page for validating chat functionality and dependencies |
| lib/typed-mind-static-website/test-monaco.html | Simple Monaco editor test page to verify editor loading |
| lib/typed-mind-static-website/test-refactored.html | Test page for refactored architecture components with comprehensive test suite |
| lib/typed-mind-static-website/test-token-manager.html | Test page specifically for TokenManager functionality with encryption/decryption tests |
| lib/typed-mind-static-website/vercel.json | Vercel configuration file with build settings, security headers, and cache control for static assets |
| lib/typed-mind-test-suite/TEST_COVERAGE.md | Documentation file tracking test coverage for TypedMind DSL scenarios and validation rules |
| lib/typed-mind-test-suite/package.json | Package configuration for TypedMind test suite with vitest and workspace dependency setup |
| lib/typed-mind-test-suite/program.tmd | TypedMind DSL program file defining test suite structure and main test file reference |
| lib/typed-mind-test-suite/scenarios/imports/circular/module-a.tmd | Module A that imports Module B and defines ServiceA which calls ServiceB.methodB in its methodA |
| lib/typed-mind-test-suite/scenarios/imports/circular/module-b.tmd | Module B that imports Module A and defines ServiceB which calls ServiceA.methodA in its methodB, creating a circular dependency |
| lib/typed-mind-test-suite/scenarios/imports/shared/auth-duplicate.tmd | Duplicate auth module defining AuthService with authenticate and verify methods to test naming conflicts |
| lib/typed-mind-test-suite/scenarios/imports/shared/auth-module.tmd | Original auth module defining AuthService with login, logout, and checkSession methods plus validateUser function |
| lib/typed-mind-test-suite/scenarios/imports/shared/database.tmd | Database connection module with Connection service for database operations and a query function |
| lib/typed-mind-test-suite/scenarios/imports/shared/service-layer.tmd | Service layer module that imports database and defines UserService for user CRUD operations using database Connection |
| lib/typed-mind-test-suite/scenarios/imports/ui/components.tmd | UI components library defining reusable Button, Form, Input, and Modal components with their relationships |
| lib/typed-mind-test-suite/scenarios/scenario-01-duplicate-export.tmd | Test scenario for duplicate export validation where UserService is exported by multiple files causing an error |
| lib/typed-mind-test-suite/scenarios/scenario-02-orphaned-entity.tmd | Test scenario containing orphaned entities (OrphanedFunction, OrphanedClass, OrphanedFile) that are not referenced anywhere |
| lib/typed-mind-test-suite/scenarios/scenario-03-circular-dependency.tmd | Test scenario demonstrating circular dependency between ServiceA, ServiceB, and ServiceC forming a dependency loop |
| lib/typed-mind-test-suite/scenarios/scenario-04-undefined-imports.tmd | Tests a program with imports referencing non-existent services and modules |
| lib/typed-mind-test-suite/scenarios/scenario-05-undefined-exports.tmd | Tests a program declaring exports for functions and classes that are not actually defined |
| lib/typed-mind-test-suite/scenarios/scenario-06-invalid-method-calls.tmd | Tests a program with method calls to non-existent methods on classes and undefined classes |
| lib/typed-mind-test-suite/scenarios/scenario-07-duplicate-paths.tmd | Tests a program with two files incorrectly mapped to the same file path |
| lib/typed-mind-test-suite/scenarios/scenario-08-multiple-programs.tmd | Tests validation error when multiple program entry points are defined in one file |
| lib/typed-mind-test-suite/scenarios/scenario-09-no-program.tmd | Tests validation error when no program entry point is declared in the file |
| lib/typed-mind-test-suite/scenarios/scenario-10-dto-validation.tmd | Tests DTO validation with references to non-existent DTOs and incorrect DTO usage |
| lib/typed-mind-test-suite/scenarios/scenario-11-class-export-validation.tmd | Tests validation of class and function exports that are declared but not actually exported |
| lib/typed-mind-test-suite/scenarios/scenario-12-valid-complete.tmd | Tests a complete, valid TypedMind program with proper todo app structure and relationships |
| lib/typed-mind-test-suite/scenarios/scenario-13-asset-validation.tmd | Tests asset validation with proper exported assets and detection of unexported asset references |
| lib/typed-mind-test-suite/scenarios/scenario-14-uicomponent-validation.tmd | Tests validation of UIComponent export requirements and parent-child hierarchy relationships |
| lib/typed-mind-test-suite/scenarios/scenario-15-function-affects-ui.tmd | Tests functions that affect UI components and validates proper references to existing UIComponents |
| lib/typed-mind-test-suite/scenarios/scenario-16-complete-ui-example.tmd | Complete todo application example demonstrating UI components, controllers, models, DTOs and their interactions |
| lib/typed-mind-test-suite/scenarios/scenario-17-multiple-programs.tmd | Tests handling of multiple programs (server-side renderer and client-side UI) within one TypedMind file |
| lib/typed-mind-test-suite/scenarios/scenario-18-file-exports-ui-assets.tmd | Tests that files can export both UI assets and UIComponents with proper validation |
| lib/typed-mind-test-suite/scenarios/scenario-19-uicomponent-containment.tmd | Tests UIComponent containment validation requiring non-root components to be contained by others |
| lib/typed-mind-test-suite/scenarios/scenario-20-basic-import.tmd | Tests basic import functionality from external TypedMind files with service integration |
| lib/typed-mind-test-suite/scenarios/scenario-21-aliased-import.tmd | Tests aliased imports allowing modules to be imported with custom namespace identifiers |
| lib/typed-mind-test-suite/scenarios/scenario-22-nested-import.tmd | Tests nested imports where imported files themselves import other TypedMind files |
| lib/typed-mind-test-suite/scenarios/scenario-23-circular-import.tmd | Tests circular import detection between TypedMind modules to prevent infinite dependency loops |
| lib/typed-mind-test-suite/scenarios/scenario-24-import-not-found.tmd | Tests import error when referencing a non-existent file |
| lib/typed-mind-test-suite/scenarios/scenario-25-import-duplicate-names.tmd | Tests import collision when multiple files define entities with the same name without aliasing |
| lib/typed-mind-test-suite/scenarios/scenario-26-runparameter-basic.tmd | Tests basic RunParameter functionality with environment variables, IAM roles, runtime config, and parameter consumption |
| lib/typed-mind-test-suite/scenarios/scenario-27-runparameter-orphaned.tmd | Tests detection of orphaned RunParameters that are defined but never consumed by any function |
| lib/typed-mind-test-suite/scenarios/scenario-28-runparameter-invalid-consumes.tmd | Tests validation of invalid parameter consumption including non-existent parameters and wrong entity types |
| lib/typed-mind-test-suite/scenarios/scenario-29-referencedby-tracking.tmd | Tests the ReferencedBy tracking system to ensure proper bidirectional references between entities |
| lib/typed-mind-test-suite/scenarios/scenario-30-invalid-reference-types.tmd | Tests validation of invalid reference relationships between different entity types |
| lib/typed-mind-test-suite/scenarios/scenario-31-mixed-syntax.tmd | Tests mixed usage of both longform and shortform syntax within the same TypedMind specification |
| lib/typed-mind-test-suite/scenarios/scenario-32-spa-react-app.tmd | Tests a comprehensive single-page e-commerce React application with Redux state management, routing, and Stripe integration |
| lib/typed-mind-test-suite/scenarios/scenario-33-electron-desktop-app.tmd | Tests a complex Electron desktop code editor application with main/renderer processes, file system operations, git integration, and terminal support |
| lib/typed-mind-test-suite/scenarios/scenario-34-cli-tool.tmd | A CLI tool and build system with task running, dependency resolution, plugin support, and worker pool functionality |
| lib/typed-mind-test-suite/scenarios/scenario-35-video-game.tmd | A 3D action RPG video game built with Unity featuring multiplayer, combat, AI, world generation, and comprehensive UI systems |
| lib/typed-mind-test-suite/scenarios/scenario-36-static-website.tmd | A modern static website portfolio and blog built with Next.js featuring MDX content, SEO optimization, and edge deployment |
| lib/typed-mind-test-suite/scenarios/scenario-37-data-pipeline.tmd | A distributed real-time analytics ETL pipeline with Kafka ingestion, Spark/Flink processing, data quality monitoring, and multi-storage support |
| lib/typed-mind-test-suite/scenarios/scenario-38-dependency-validation.tmd | A simple web application for testing dependency validation with basic authentication using axios, react, express, and lodash |
| lib/typed-mind-test-suite/src/scenarios.01-duplicate-export.test.ts | Tests DSLChecker validation against scenario files for duplicate export errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.02-orphaned-entity.test.ts | Tests DSLChecker validation against scenario files for orphaned entity errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.03-circular-dependency.test.ts | Tests DSLChecker validation against scenario files for circular dependency errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.04-undefined-imports.test.ts | Tests DSLChecker validation against scenario files for undefined import errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.05-undefined-exports.test.ts | Tests DSLChecker validation against scenario files for undefined export errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.06-invalid-method-calls.test.ts | Tests DSLChecker validation against scenario files for invalid method call errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.07-duplicate-paths.test.ts | Tests DSLChecker validation against scenario files for duplicate path errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.08-multiple-programs.test.ts | Tests DSLChecker validation against scenario files for multiple program errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.09-no-program.test.ts | Tests DSLChecker validation against scenario files for missing program errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.10-dto-validation.test.ts | Tests DSLChecker validation against scenario files for DTO validation errors and generates snapshots |
| lib/typed-mind-test-suite/src/scenarios.11-class-export-validation.test.ts | Tests DSL checker validation for class export scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.12-valid-complete.test.ts | Tests DSL checker validation for complete valid scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.13-asset-validation.test.ts | Tests DSL checker validation for asset validation scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.14-uicomponent-validation.test.ts | Tests DSL checker validation for UI component validation scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.15-function-affects-ui.test.ts | Tests DSL checker validation for function affects UI scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.16-complete-ui-example.test.ts | Tests DSL checker validation for complete UI example scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.17-multiple-programs.test.ts | Tests DSL checker validation for multiple programs scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.18-file-exports-ui-assets.test.ts | Tests DSL checker validation for file exports UI assets scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.19-uicomponent-containment.test.ts | Tests DSL checker validation for UI component containment scenarios using snapshot testing |
| lib/typed-mind-test-suite/src/scenarios.20-basic-import.test.ts | Tests DSL checker validation for basic import scenarios using snapshot testing with file path context |
| lib/typed-mind-test-suite/src/scenarios.21-aliased-import.test.ts | Tests validation of aliased import statements in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.22-nested-import.test.ts | Tests validation of nested import statements in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.23-circular-import.test.ts | Tests validation of circular import detection in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.24-import-not-found.test.ts | Tests validation of error handling for missing import targets in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.25-import-duplicate-names.test.ts | Tests validation of duplicate name conflicts in import statements in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.26-runparameter-basic.test.ts | Tests basic RunParameter functionality and validation in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.27-runparameter-orphaned.test.ts | Tests detection of orphaned RunParameters that are not consumed by any entity |
| lib/typed-mind-test-suite/src/scenarios.28-runparameter-invalid-consumes.test.ts | Tests detection of invalid RunParameter consumption including non-existent parameters and wrong entity types |
| lib/typed-mind-test-suite/src/scenarios.29-referencedby-tracking.test.ts | Tests the tracking of ReferencedBy relationships between different entity types in the DSL |
| lib/typed-mind-test-suite/src/scenarios.30-invalid-reference-types.test.ts | Tests validation of reference types and their correctness in TypedMind DSL files |
| lib/typed-mind-test-suite/src/scenarios.31-mixed-syntax.test.ts | Tests mixed longform and shortform syntax parsing with DSLChecker validation and entity type verification |
| lib/typed-mind-test-suite/src/scenarios.32-spa-react-app.test.ts | Tests SPA React application architecture validation using DSLChecker with snapshot comparison |
| lib/typed-mind-test-suite/src/scenarios.33-electron-desktop-app.test.ts | Tests Electron desktop application architecture validation using DSLChecker with snapshot comparison |
| lib/typed-mind-test-suite/src/scenarios.34-cli-tool.test.ts | Tests CLI tool architecture validation using DSLChecker with snapshot comparison |
| lib/typed-mind-test-suite/src/scenarios.35-video-game.test.ts | Tests video game architecture validation using DSLChecker with snapshot comparison |
| lib/typed-mind-test-suite/src/scenarios.36-static-website.test.ts | Tests static website with build pipeline architecture validation using DSLChecker with snapshot comparison |
| lib/typed-mind-test-suite/src/scenarios.37-data-pipeline.test.ts | Tests data pipeline ETL architecture validation using DSLChecker with snapshot comparison |
| lib/typed-mind-test-suite/src/scenarios.38-dependency-validation.test.ts | Tests dependency entity validation using separate DSLParser and DSLValidator with snapshot comparison |
| lib/typed-mind-test-suite/tsconfig.json | TypeScript configuration extending root config with specific src/dist directory settings |
| lib/typed-mind-test-suite/vitest.config.ts | Vitest configuration file enabling globals and node environment for testing |
| lib/typed-mind-vscode-extension/.vscodeignore | VS Code ignore configuration file specifying which files to exclude from the published extension package |
| lib/typed-mind-vscode-extension/CHANGELOG.md | Changelog documenting version history and features for the TypedMind DSL VS Code extension |
| lib/typed-mind-vscode-extension/PUBLICATION-NOTES.md | Publication preparation notes with setup status and missing icon requirements for marketplace release |
| lib/typed-mind-vscode-extension/README.md | README providing documentation and usage instructions for the TypedMind DSL VS Code extension |
| lib/typed-mind-vscode-extension/docs/colorblind-accessibility.md | Documentation and implementation guide for TypedMind DSL's colorblind-friendly accessibility features |
| lib/typed-mind-vscode-extension/docs/colorblind-friendly-syntax-highlighting-design.md | Comprehensive design specification with color choices, text decorations, and implementation details for accessible syntax highlighting |
| lib/typed-mind-vscode-extension/docs/colorblind-implementation-guide.md | Quick implementation guide with testing methods and accessibility checklist for the colorblind-friendly syntax highlighting |
| lib/typed-mind-vscode-extension/docs/generate-color-comparison.html | HTML tool for visually comparing colorblind-friendly colors with WCAG contrast ratios and colorblind simulation tests |
| lib/typed-mind-vscode-extension/language-configuration.json | Language configuration JSON defining brackets, comments, and folding rules for TypedMind DSL files |
| lib/typed-mind-vscode-extension/package.json | Package.json defining extension metadata, dependencies, and build scripts for the VS Code extension |
| lib/typed-mind-vscode-extension/program.tmd | Sample TypedMind DSL program file demonstrating the extension's syntax highlighting capabilities |
| lib/typed-mind-vscode-extension/src/extension.ts | Main extension entry point that activates the TypedMind language server client for VS Code |
| lib/typed-mind-vscode-extension/syntaxes/typedmind-accessible.tmLanguage.json | Advanced TextMate grammar file with specific TypedMind scopes for better theme control and accessibility support |
| lib/typed-mind-vscode-extension/syntaxes/typedmind.tmLanguage.json | Standard TextMate grammar file with basic entity matching and less specific scoping for TypedMind DSL syntax |
| lib/typed-mind-vscode-extension/themes/typedmind-accessible-dark.json | Dark theme with accessibility-focused colors, bold/italic/underline styles, and WCAG-compliant contrast ratios |
| lib/typed-mind-vscode-extension/themes/typedmind-accessible-light.json | Light theme with dark colors optimized for white backgrounds and colorblind accessibility compliance |
| lib/typed-mind-vscode-extension/themes/typedmind-colorblind-dark.json | Dark theme implementing the original colorblind design with coral, plum, yellow colors and varied text styles |
| lib/typed-mind-vscode-extension/tsconfig.json | TypeScript configuration extending parent config with VS Code-specific compiler settings |
| lib/typed-mind-vscode-extension/tsup.config.ts | Build configuration using tsup to bundle the extension's TypeScript source into CommonJS format |
| lib/typed-mind/.npmignore | Specifies NPM ignore rules for excluding source files, tests, and build artifacts from published package |
| lib/typed-mind/LONGFORM_IMPLEMENTATION.md | Implementation guide comparing shortform vs longform syntax for all TypedMind entity types with detailed examples and migration notes |
| lib/typed-mind/README.md | Comprehensive README documenting the TypedMind DSL core parser/validator library with installation, usage examples, and feature overview |
| lib/typed-mind/grammar.ebnf | EBNF grammar specification defining the complete formal syntax rules for the TypedMind DSL language |
| lib/typed-mind/grammar.json | JSON configuration file containing regex patterns and descriptions for parsing all TypedMind entity types and continuations |
| lib/typed-mind/grammar.md | Auto-generated markdown documentation providing complete grammar reference with patterns, examples, and entity descriptions |
| lib/typed-mind/package.json | NPM package configuration for the TypedMind core library defining dependencies, scripts, and publishing settings |
| lib/typed-mind/program.tmd | Example TypedMind program demonstrating the DSL syntax for defining a complete application architecture with entities and relationships |
| lib/typed-mind/src/formatter.ts | Formats validation errors with line position markers and provides helpful error display for DSL parsing issues |
| lib/typed-mind/src/generate-grammar-doc.ts | A CLI script that generates TypedMind DSL grammar documentation in Markdown, JSON, and EBNF formats |
| lib/typed-mind/src/grammar-doc-generator.test.ts | Test suite for GrammarDocGenerator verifying markdown, JSON, and EBNF output generation functionality |
| lib/typed-mind/src/grammar-doc-generator.ts | Generates comprehensive TypedMind DSL grammar documentation with entity patterns, examples, and EBNF notation |
| lib/typed-mind/src/grammar-validator.test.ts | Test suite for GrammarValidator ensuring proper entity structure validation and error detection |
| lib/typed-mind/src/grammar-validator.ts | Validates TypedMind DSL entity structures against grammar rules and provides detailed error reporting |
| lib/typed-mind/src/import-resolver.ts | Resolves and processes import statements in TypedMind DSL files with circular dependency detection |
| lib/typed-mind/src/index.ts | Main entry point that exports DSL components and provides DSLChecker for parsing and validating TypedMind DSL programs |
| lib/typed-mind/src/longform-parser.test.ts | Tests for parsing longform TypedMind DSL syntax with comprehensive entity type validation |
| lib/typed-mind/src/longform-parser.ts | Implements parser for longform TypedMind DSL syntax with block-based entity declarations and property parsing |
| lib/typed-mind/src/parser-patterns.ts | Defines regex patterns and constants for parsing TypedMind DSL entity types and continuation syntax |
| lib/typed-mind/src/parser.test.ts | Unit tests for the main DSL parser covering all entity types and parsing scenarios |
| lib/typed-mind/src/parser.ts | Main TypedMind DSL parser that handles both shortform and longform syntax with grammar validation |
| lib/typed-mind/src/types.ts | TypeScript type definitions for all TypedMind entity types, validation, and parser structures |
| lib/typed-mind/src/validate-docs.test.ts | Integration tests validating TypedMind grammar examples from documentation files |
| lib/typed-mind/src/validator.ts | Comprehensive validator for TypedMind DSL entities with relationship checking and error reporting |
| lib/typed-mind/tsconfig.json | TypeScript configuration extending parent config with specific build settings for the typed-mind package |
| lib/typed-mind/tsup.config.ts | Build configuration using tsup for compiling TypeScript to CommonJS with type definitions |
| monorepo-architecture.html | Interactive HTML visualization tool for exploring TypedMind architecture with graph rendering and entity details |
| monorepo-program.tmd | TypedMind monorepo architecture specification defining programs, assets, and component relationships for the ecosystem |
| package.json | Root package.json for TypedMind monorepo with workspace scripts and development dependencies |
| parser.md | TypeScript parser implementation sample with position tracking, entity validation, error detection for orphans/imports/circular dependencies, and fuzzy matching suggestions |
| pnpm-lock.yaml | PNPM lock file containing dependency resolution information (too large to read fully) |
| pnpm-workspace.yaml | PNPM workspace configuration defining lib/* as workspace packages |
| README.md | Main project README for a TypedMind DSL for describing and visualizing program architecture with 5 packages including parser, renderer, CLI, LSP, and VS Code extension |
| renderer.md | Interactive HTML/D3.js renderer with dark theme showing entity sidebar, force-directed graph visualization, node selection, zoom controls, and architecture exploration features |
| specification.md | Complete DSL specification with long/short form syntax for Programs, Files, Functions, Classes, and Constants using operators like ->, <-, @, ::, ~>, <:, !, =>, plus validation rules |
| start-prompt.md | Initial project requirements document outlining goals for an LLM-optimized DSL with semantic intuition, token efficiency, static validation, TypeScript targeting, excellent errors, and interactive rendering |
| test-playground.js | Node.js test script to verify playground functionality and provide manual testing instructions |
| tsconfig.json | TypeScript configuration with strict settings and composite project references |
| vitest.config.ts | Vitest configuration for Node.js testing environment with global test functions |