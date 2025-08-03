const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  fs.readdirSync(src).forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all files from src directory (including subdirectories)
const srcDir = path.join(__dirname, 'src');
copyDirectory(srcDir, distDir);

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

// Copy JS files and directories
fs.readdirSync(jsDir).forEach(item => {
  const srcPath = path.join(jsDir, item);
  const destPath = path.join(distJsDir, item);
  
  if (fs.statSync(srcPath).isDirectory()) {
    copyDirectory(srcPath, destPath);
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
});

// Copy typed-mind library
const typedMindSrc = path.join(__dirname, '..', 'typed-mind', 'dist');
const typedMindDist = path.join(distAssetsDir, 'typed-mind', 'dist');
if (!fs.existsSync(typedMindDist)) {
  fs.mkdirSync(typedMindDist, { recursive: true });
}

// Copy necessary files from typed-mind dist
const typedMindFiles = ['parser.js', 'grammar-validator.js', 'index.js'];
typedMindFiles.forEach(file => {
  const srcFile = path.join(typedMindSrc, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, path.join(typedMindDist, file));
  }
});

// Copy grammar.md from typed-mind root
const grammarSrc = path.join(__dirname, '..', 'typed-mind', 'grammar.md');
const grammarDest = path.join(distAssetsDir, 'typed-mind', 'grammar.md');
if (fs.existsSync(grammarSrc)) {
  fs.copyFileSync(grammarSrc, grammarDest);
  console.log('Copied grammar.md to dist/assets/typed-mind/');
}

console.log('Build completed successfully!');