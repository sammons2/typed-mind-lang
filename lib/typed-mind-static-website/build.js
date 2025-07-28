const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all files from src directory
const srcDir = path.join(__dirname, 'src');
const srcFiles = fs.readdirSync(srcDir);
srcFiles.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  fs.writeFileSync(path.join(distDir, file), content);
});

// Copy assets
const assetsDir = path.join(__dirname, 'assets');
const distAssetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}

// Copy CSS
const cssDir = path.join(assetsDir, 'css');
const distCssDir = path.join(distAssetsDir, 'css');
if (!fs.existsSync(distCssDir)) {
  fs.mkdirSync(distCssDir, { recursive: true });
}
fs.readdirSync(cssDir).forEach(file => {
  fs.copyFileSync(path.join(cssDir, file), path.join(distCssDir, file));
});

// Copy JS
const jsDir = path.join(assetsDir, 'js');
const distJsDir = path.join(distAssetsDir, 'js');
if (!fs.existsSync(distJsDir)) {
  fs.mkdirSync(distJsDir, { recursive: true });
}
fs.readdirSync(jsDir).forEach(file => {
  fs.copyFileSync(path.join(jsDir, file), path.join(distJsDir, file));
});

console.log('Build completed successfully!');