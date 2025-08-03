#!/usr/bin/env node

// Simple script to test the playground functionality using headless browser
const { spawn } = require('child_process');

console.log('Starting TypedMind Playground Test...');
console.log('');
console.log('Please manually test the following:');
console.log('');
console.log('1. Open http://localhost:8080/playground.html in your browser');
console.log('2. Open browser developer tools (F12)');
console.log('3. Check the Console tab for debugging output');
console.log('');
console.log('Expected console output:');
console.log('- "Monaco loaded, creating editor..."');
console.log('- "Initializing parser, TypedMindParser available: true"');
console.log('- "TypedMind parser initialized successfully: [object]"');
console.log('- "Registering hover provider for typedmind language"');
console.log('- "Editor created successfully"');
console.log('- "Language providers registered"');
console.log('- "Editor model language: typedmind"');
console.log('');
console.log('To test hover functionality:');
console.log('- Hover over keywords like "program", "entryPoint", "version"');
console.log('- You should see console logs: "Hover provider called at position: ..."');
console.log('- Tooltips should appear with keyword documentation');
console.log('');
console.log('To test validation:');
console.log('- Type invalid syntax and check if errors appear in Problems panel');
console.log('- Console should show: "validateCode called, parser available: true"');
console.log('- Console should show: "Parse result: [object]"');
console.log('');
console.log('Manual test functions available in console:');
console.log('- testHover() - Test hover functionality');
console.log('- testParser() - Test parser functionality');
console.log('');

// Check if server is running
const checkServer = spawn('curl', ['-s', '-I', 'http://localhost:8080/playground.html']);

checkServer.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Server is running at http://localhost:8080');
    console.log('   Please open the playground and test manually');
  } else {
    console.log('❌ Server is not running');
    console.log('   Please start the server first with: cd lib/typed-mind-static-website && node serve.js');
  }
});