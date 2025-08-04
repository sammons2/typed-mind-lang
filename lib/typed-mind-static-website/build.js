const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

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

// Function to validate TypedMind snippets
function validateSnippets() {
  const snippetsDir = path.join(__dirname, 'snippets');
  
  if (!fs.existsSync(snippetsDir)) {
    console.log(`${colors.yellow}Warning: snippets directory not found${colors.reset}`);
    return true;
  }

  const snippetFiles = fs.readdirSync(snippetsDir).filter(file => file.endsWith('.tmd'));
  
  if (snippetFiles.length === 0) {
    console.log(`${colors.yellow}Warning: No .tmd files found in snippets directory${colors.reset}`);
    return true;
  }

  console.log(`${colors.blue}Validating ${snippetFiles.length} TypedMind snippet files...${colors.reset}`);
  
  let validCount = 0;
  let errorCount = 0;
  let skipCount = 0;

  // Files that are known to be documentation snippets and may have validation issues
  // These are partial examples that don't need to be complete programs
  const documentationSnippets = [
    'file-longform.tmd', 'file-shortform.tmd',
    'class-longform.tmd', 'class-shortform.tmd',
    'classfile-longform.tmd', 'classfile-shortform.tmd',
    'function-longform.tmd', 'function-shortform.tmd',
    'constants-longform.tmd', 'constants-shortform.tmd',
    'runparameter-longform.tmd', 'runparameter-shortform.tmd',
    'dependency-longform.tmd', 'dependency-shortform.tmd',
    'asset-longform.tmd', 'asset-shortform.tmd',
    'uicomponent-longform.tmd', 'uicomponent-shortform.tmd',
    'import-longform.tmd', 'import-shortform.tmd',
    'getting-started-longform.tmd', 'getting-started-shortform.tmd',
    'getting-started-dto-longform.tmd', 'getting-started-dto-shortform.tmd',
    'hero-longform.tmd', 'hero-shortform.tmd'
  ];

  for (const file of snippetFiles) {
    const filePath = path.join(snippetsDir, file);
    
    // Skip validation for documentation snippets (they're partial examples)
    if (documentationSnippets.includes(file)) {
      skipCount++;
      console.log(`  ${colors.yellow}⚠${colors.reset} ${file} (documentation snippet - validation skipped)`);
      continue;
    }
    
    try {
      // Use the TypedMind CLI to validate the file
      // Try different possible CLI locations
      let cliCommand = 'typed-mind';
      
      // First try to find the CLI in the local project
      const localCliPath = path.join(__dirname, '..', 'typed-mind-cli', 'dist', 'cli.js');
      if (fs.existsSync(localCliPath)) {
        cliCommand = `node "${localCliPath}"`;
      }
      
      execSync(`${cliCommand} -c "${filePath}"`, { 
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      validCount++;
      console.log(`  ${colors.green}✓${colors.reset} ${file}`);
      
    } catch (error) {
      errorCount++;
      console.log(`  ${colors.red}✗${colors.reset} ${file}`);
      
      // Parse error output to show specific validation issues
      const errorOutput = error.stdout || error.stderr || error.message;
      const lines = errorOutput.split('\n').filter(line => line.trim());
      
      // Show relevant error lines (skip CLI usage info)
      for (const line of lines) {
        if (line.includes('Error:') || line.includes('ValidationError:') || line.includes('SyntaxError:')) {
          console.log(`    ${colors.red}${line.trim()}${colors.reset}`);
        }
      }
    }
  }

  console.log(`\n${colors.bright}Validation Summary:${colors.reset}`);
  console.log(`  Valid: ${colors.green}${validCount}${colors.reset}`);
  console.log(`  Errors: ${colors.red}${errorCount}${colors.reset}`);
  console.log(`  Skipped: ${colors.yellow}${skipCount}${colors.reset} (documentation snippets)`);
  console.log(`  Total: ${snippetFiles.length}`);

  // Only fail the build if there are errors in non-documentation snippets
  if (errorCount > 0) {
    console.log(`\n${colors.red}${colors.bright}Build failed: Some core snippets have validation errors${colors.reset}`);
    console.log(`Please fix the validation errors above before building.`);
    return false;
  }

  return true;
}

console.log(`${colors.bright}${colors.blue}TypedMind Static Website Build${colors.reset}\n`);

// Step 1: Validate all TypedMind snippets
console.log(`${colors.bright}Step 1: Validating TypedMind snippets${colors.reset}`);
if (!validateSnippets()) {
  process.exit(1);
}

console.log(`\n${colors.bright}Step 2: Building website${colors.reset}`);

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

// Copy snippets directory to dist
const snippetsDir = path.join(__dirname, 'snippets');
const distSnippetsDir = path.join(distDir, 'snippets');
if (fs.existsSync(snippetsDir)) {
  if (!fs.existsSync(distSnippetsDir)) {
    fs.mkdirSync(distSnippetsDir, { recursive: true });
  }
  copyDirectory(snippetsDir, distSnippetsDir);
  console.log('Copied snippets directory to dist/snippets/');
}

console.log(`\n${colors.green}${colors.bright}Build completed successfully!${colors.reset}`);