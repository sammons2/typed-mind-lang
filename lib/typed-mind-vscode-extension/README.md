# TypedMind DSL VS Code Extension

VS Code language support for TypedMind Domain Specific Language (.tmd files).

## 🎨 Colorblind-Friendly by Default

This extension features an accessibility-first design with colors optimized for all types of color vision:

- **10 distinct colors** for different entity types
- **Text decorations** (bold, italic, underline) as secondary indicators
- **WCAG AA compliant** contrast ratios
- **Tested for** protanopia, deuteranopia, and tritanopia

## Features

### Language Support
- **Syntax highlighting** with colorblind-friendly colors
- **Real-time validation** and diagnostics
- **IntelliSense** for entity names and operators
- **Hover information** showing entity details and relationships
- **Go to definition** for entity references
- **Find all references** across your codebase
- **Semantic highlighting** for consistent entity coloring

### Entity Type Colors

| Entity | Color | Style | Hex |
|--------|-------|-------|-----|
| **Program** | Coral Red | Bold | `#FF6B6B` |
| **File** | Plum | Normal | `#DDA0DD` |
| **Function** | Yellow | Normal | `#FFE66D` |
| **Class** | Mint Green | Italic | `#95E1D3` |
| **Constants** | Lavender | Underline | `#C7CEEA` |
| **DTO** | Peach | Normal | `#FFB4A2` |
| **Asset** | Sky Blue | Italic | `#B8E7FF` |
| **UIComponent** | Powder Blue | Bold | `#A8DADC` |
| **RunParameter** | Off White | Bold Italic | `#F1FAEE` |
| **Dependency** | Sandy Orange | Normal | `#F4A261` |

## Installation

1. Build: `pnpm build`
2. Package: `pnpm package`
3. Install: `code --install-extension typed-mind-*.vsix`
4. Select **"TypedMind Colorblind Dark"** theme for best experience

## Usage

The extension activates automatically for `.tmd` files. For optimal accessibility:
1. Open Command Palette (Cmd/Ctrl+K Cmd/Ctrl+T)
2. Select "TypedMind Colorblind Dark" theme

## Accessibility

This extension prioritizes accessibility through:
- **Luminance variation** - Colors differ in brightness, not just hue
- **Pattern recognition** - Text styles provide non-color cues
- **High contrast** - All colors meet WCAG standards
- **Universal design** - Works for all users, not just colorblind

## Development

- `pnpm dev` - Watch mode
- `pnpm build` - Build extension
- `pnpm package` - Create .vsix

## License

MIT