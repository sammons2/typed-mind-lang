# Change Log

All notable changes to the "TypedMind DSL" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-03

### Added
- Initial release of TypedMind DSL VS Code extension
- Syntax highlighting for .tmd files with colorblind-friendly colors
- Language server integration with real-time validation
- IntelliSense support for entity names and operators
- Hover information showing entity details and relationships
- Go to definition for entity references
- Find all references across codebase
- Semantic highlighting for consistent entity coloring
- Colorblind-accessible themes:
  - TypedMind Colorblind Dark
- Language configuration for TypedMind DSL
- 10 distinct colors optimized for all types of color vision
- Text decorations (bold, italic, underline) as secondary indicators
- WCAG AA compliant contrast ratios
- Support for protanopia, deuteranopia, and tritanopia

### Features
- Automatic activation for .tmd files
- Real-time diagnostics and error reporting
- Comprehensive entity type support:
  - Program, File, Function, Class
  - Constants, DTO, Asset, UIComponent
  - RunParameter, Dependency
- Accessibility-first design with luminance variation
- Pattern recognition through text styles
- High contrast design meeting WCAG standards

## [0.1.7] - 2025-09-13

### Added
- **Format Toggle Command** - Toggle between shortform and longform syntax with `Ctrl+Shift+Alt+F`
- **VS Code Command Integration** - "TypedMind: Toggle Syntax Format" in command palette
- **Context Menu Support** - Right-click menu option to toggle format in .tmd files
- **Syntax Generator** - Complete bidirectional conversion between shortform and longform
- **Selection Support** - Toggle format for selected text or entire document
- **Smart Format Detection** - Automatically detects current format (shortform/longform/mixed)

### Fixed
- **LSP Server Crashes** - Fixed bundling issues with vscode-languageserver dependencies
- **Node Version Compatibility** - Reduced requirement from Node >=22 to >=18 for wider compatibility
- **WorkspaceEdit Constructor Error** - Fixed VS Code API import issues in bundled extension
- **Hover Tooltips** - Resolved hover provider not showing entity information
- **LSP Path Resolution** - Fixed server module path detection for both dev and production environments

### Changed
- **Improved Error Handling** - Better error messages and recovery throughout LSP and extension
- **Enhanced Bundling** - All dependencies properly bundled (extension: 783KB, LSP: 631KB)
- **Cleaner Logging** - Reduced verbose logging in production, added debug mode for troubleshooting

## [Unreleased]

### Added
- **ClassFile entity support** (`#:` operator) - Fusion syntax for combined class and file entities
- **Method call syntax highlighting** - Proper highlighting for `ClassName.methodName` patterns
- **Import statement support** - Full support for `@import` and `import` with aliasing
- **Enhanced DTO field types** - Support for complex types including unions, tuples, arrays, and nested objects
- **Optional field syntax** - Support for both `?` suffix and `(optional)` annotation in DTO fields
- **Parameter consumption operator** (`$<`) - Highlighting for function parameter consumption
- **Asset contains program** (`>>`) operator support
- **Improved entity name patterns** - Support for underscores and Unicode characters in entity names
- **Scoped package dependencies** - Support for `@org/package` dependency syntax
- **Enhanced type highlighting** - Added more TypeScript/JavaScript types (Promise, Record, Map, Set, etc.)
- **Better operator precedence** - Fixed operator matching conflicts

### Fixed
- Missing ClassFile entity type in grammar
- Incorrect regex patterns for entity name validation
- Method calls not being properly highlighted in function calls
- Import statements not being recognized
- Complex DTO field types not being parsed correctly

### Planned
- Additional theme variants
- Enhanced autocomplete functionality
- Code snippets for common patterns
- Improved error messages and diagnostics
- Support for longform syntax highlighting