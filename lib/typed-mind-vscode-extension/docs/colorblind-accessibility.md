# TypedMind Colorblind-Friendly Color Scheme

## Design Principles

This color scheme is designed to be accessible for users with all types of color blindness while maintaining clear visual distinction between entity types.

### Color Assignments

| Entity Type | Color (Hex) | Color Name | Text Style | Notes |
|-------------|-------------|------------|------------|-------|
| **Program** | `#FF6B6B` | Coral Red | Bold | High contrast, easily distinguishable |
| **File** | `#4ECDC4` | Turquoise | Normal | Cool tone, distinct from warm colors |
| **Function** | `#FFE66D` | Yellow | Normal | Traditional function color, high luminance |
| **Class** | `#95E1D3` | Mint Green | Italic | Soft green, differentiated by style |
| **Constants** | `#C7CEEA` | Lavender | Underline | Light purple, underline for emphasis |
| **DTO** | `#FFB4A2` | Peach | Normal | Warm tone, distinct from yellows |
| **Asset** | `#B8E7FF` | Sky Blue | Italic | Light blue, italic for distinction |
| **UIComponent** | `#A8DADC` | Powder Blue | Bold | Medium blue, bold for importance |
| **RunParameter** | `#F1FAEE` | Off White | Bold Italic | Near white, dual style for visibility |
| **Dependency** | `#F4A261` | Sandy Orange | Normal | Distinct orange, good contrast |

### Accessibility Features

1. **Luminance Variation**: Colors are chosen with different brightness levels to ensure distinction even in grayscale
2. **Text Decorations**: Bold, italic, and underline provide additional visual cues beyond color
3. **High Contrast**: All colors meet WCAG AA standards against dark backgrounds
4. **Distinct Hues**: Colors span the spectrum to maximize differences

### Color Blindness Considerations

- **Protanopia** (Red-blind): Yellow, blue, and luminance differences maintain distinction
- **Deuteranopia** (Green-blind): Blue-yellow axis and brightness provide clarity
- **Tritanopia** (Blue-blind): Red-green axis and text styles ensure readability

### Testing

To test the color scheme:
1. Use VS Code's built-in color theme switcher
2. Install a color blindness simulator extension
3. Verify all entity types remain visually distinct