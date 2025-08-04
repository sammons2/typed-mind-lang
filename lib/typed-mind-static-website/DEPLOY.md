# Deployment Guide

This guide explains how to deploy the TypedMind Playground to GitHub Pages.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **Node.js 20+**: Required for building the project
3. **GitHub Pages**: Must be enabled in repository settings

## Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Deploy TypedMind Playground"
   git push origin main
   ```

3. **Verify Deployment**:
   - Check the "Actions" tab in your repository
   - Wait for the deployment to complete
   - Visit your GitHub Pages URL: `https://[username].github.io/[repository-name]`

## Manual Deployment

You can also deploy manually using the gh-pages package:

### Setup Steps:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build and Deploy**:
   ```bash
   npm run deploy
   ```

This will build the project and push the `dist/` directory to the `gh-pages` branch.

## Configuration

The project is pre-configured for GitHub Pages deployment:

- ✅ **Homepage URL**: Set to `https://sammons.github.io/typed-mind-playground`
- ✅ **Relative Paths**: All asset paths are relative for subdirectory deployment
- ✅ **Jekyll Bypass**: `.nojekyll` file prevents Jekyll processing
- ✅ **Build Optimization**: All assets are properly structured for static hosting

## Troubleshooting

### Build Failures
- Ensure Node.js 20+ is installed
- Check that all dependencies are installed: `npm ci`
- Verify the build works locally: `npm run build`

### 404 Errors
- Ensure GitHub Pages is enabled in repository settings
- Check that the source is set to "GitHub Actions"
- Verify the deployment completed successfully in the Actions tab

### Missing Assets
- Ensure all paths in HTML/CSS/JS files are relative
- Check that the build process copied all necessary files
- Verify the `.nojekyll` file exists in the root of the deployed site

## Custom Domain

To use a custom domain:

1. Add your domain to the repository settings under "Pages"
2. Create a `CNAME` file in the `src/` directory with your domain name
3. Update the `homepage` field in `package.json` to your custom domain

## Live URL

Once deployed, your TypedMind Playground will be available at:
**https://sammons.github.io/typed-mind-lang**