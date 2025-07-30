# TypedMind DSL Colorblind-Friendly Syntax Highlighting Implementation Guide

## Quick Start

To implement the colorblind-friendly syntax highlighting:

1. **Option A: Use the Custom Themes** (Recommended)
   - The extension now includes two accessible themes:
     - TypedMind Accessible Dark
     - TypedMind Accessible Light
   - Users can select these from VS Code's theme picker

2. **Option B: Update Existing Grammar** 
   - Replace `syntaxes/typedmind.tmLanguage.json` with `syntaxes/typedmind-accessible.tmLanguage.json`
   - This provides more specific TextMate scopes for better theme control

## Key Design Decisions

### 1. Color Selection Rationale

Each color was chosen based on:
- **Luminance variance**: Primary method for distinction
- **Hue separation**: Secondary distinction for normal vision
- **WCAG compliance**: All colors meet AA standards minimum

### 2. Text Decoration Strategy

| Priority | Entity Types | Decoration | Reason |
|----------|-------------|------------|--------|
| High | Program, File, Constants | Bold | Most important structural elements |
| Medium | DTO | Italic | Distinguishes from similar colors |
| Low | RunParameter, Dependency | Underline | Additional differentiation |

### 3. Scope Naming Convention

We use specific TextMate scopes for fine-grained control:
- `entity.name.namespace.typedmind` → Program
- `entity.name.module.typedmind` → File
- `entity.name.function.typedmind` → Function
- `entity.name.class.typedmind` → Class
- `constant.other.typedmind` → Constants
- `entity.name.type.interface.typedmind` → DTO
- `entity.name.tag.typedmind` → Asset
- `entity.name.tag.component.typedmind` → UIComponent
- `variable.parameter.typedmind` → RunParameter
- `support.other.module.typedmind` → Dependency

## Testing the Implementation

### 1. Visual Testing
```bash
# Open the HTML comparison file in a browser
open docs/generate-color-comparison.html
```

### 2. In VS Code
```bash
# Build and install the extension
pnpm build
pnpm package
# Install the .vsix file in VS Code
```

### 3. Colorblind Simulation Tools
- **Coblis**: https://www.color-blindness.com/coblis-color-blindness-simulator/
- **Stark**: Browser extension for accessibility testing
- **Sim Daltonism**: macOS app for real-time simulation

## Accessibility Checklist

- [ ] All entity types distinguishable in normal vision
- [ ] All entity types distinguishable in protanopia
- [ ] All entity types distinguishable in deuteranopia
- [ ] All entity types distinguishable in tritanopia
- [ ] Contrast ratios meet WCAG AA (4.5:1)
- [ ] Text decorations render correctly
- [ ] Works with Windows High Contrast mode
- [ ] Works with VS Code's built-in themes

## Fallback for Existing Themes

If users prefer their current VS Code theme, the updated grammar provides better default mapping:

1. **Better scope specificity** allows themes to target TypedMind entities
2. **Semantic scope names** align with VS Code conventions
3. **Graceful degradation** ensures readability even without custom colors

## Future Enhancements

### 1. Semantic Tokens Provider
Implement semantic highlighting for:
- Dynamic entity resolution
- Context-aware coloring
- Reference highlighting

### 2. User Preferences
Add settings for:
- Toggle text decorations
- Adjust contrast levels
- Choose color schemes

### 3. Icon Support
Consider adding icon fonts for:
- Entity type indicators
- Operator symbols
- Status indicators

## Troubleshooting

### Colors Not Appearing
1. Ensure the theme is selected in VS Code
2. Reload the window (`Cmd+R` / `Ctrl+R`)
3. Check for theme conflicts

### Poor Contrast
1. Verify monitor calibration
2. Check VS Code's zoom level
3. Try the opposite theme (dark/light)

### Text Decorations Missing
1. Some fonts may not support all decorations
2. Try a different font family
3. Check VS Code's text rendering settings

## Resources

- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)
- [Color Universal Design](https://jfly.uni-koeln.de/color/)
- [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)