# TypedMind Static Website

A beautiful, modern static website for the TypedMind Domain Specific Language (DSL).

## Features

- **Modern Design**: Clean, developer-friendly interface with dark mode support
- **Interactive Playground**: Try TypedMind syntax with real-time validation
- **Comprehensive Documentation**: Complete syntax guide and examples
- **SEO Optimized**: Structured data, meta tags, and AI crawler optimization
- **Fast & Responsive**: Optimized for performance and mobile devices
- **Accessible**: WCAG compliant with semantic HTML

## Development

### Prerequisites

- Node.js 20 or higher
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run serve

# Build for production
npm run build
```

### Project Structure

```
lib/typed-mind-static-website/
├── src/               # Source HTML files
├── assets/           
│   ├── css/          # Stylesheets
│   └── js/           # JavaScript files
├── dist/             # Built files (generated)
├── build.js          # Build script
└── package.json      # Project configuration
```

## Deployment

### GitHub Pages

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Netlify

```bash
# Deploy using Netlify CLI
netlify deploy --prod --dir=dist
```

### Vercel

```bash
# Deploy using Vercel CLI
vercel --prod
```

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

## Configuration

### Meta Tags

Edit the meta tags in `src/index.html` to customize social sharing:

- Open Graph tags for Facebook
- Twitter Card tags
- Structured data for search engines

### Analytics

To add analytics, insert your tracking code before the closing `</body>` tag in `src/index.html`.

### Content Updates

- **Examples**: Update the examples in the Examples Gallery section
- **Documentation**: Modify the syntax guide tabs
- **Features**: Edit the feature cards in the Overview section

## Performance Optimization

The site is optimized for Core Web Vitals:

- **LCP**: Hero content loads immediately
- **FID**: Minimal JavaScript for fast interactivity
- **CLS**: Fixed dimensions prevent layout shifts

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - see the main project LICENSE file