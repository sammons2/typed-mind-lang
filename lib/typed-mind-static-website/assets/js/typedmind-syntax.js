// TypedMind syntax validation and highlighting

// Add custom TypedMind language definition for Prism.js
Prism.languages.typedmind = {
  'comment': {
    pattern: /#.*/,
    greedy: true
  },
  'string': {
    pattern: /"(?:[^"\\]|\\.)*"/,
    greedy: true
  },
  // Entity names
  'entity-name': {
    pattern: /^\w+(?=\s*(?:->|@|<:|::|%|&!?|~|!|\$(?:env|iam|runtime|config)))/m,
    greedy: true,
    alias: 'class-name'
  },
  // Symbols and operators
  'symbol': {
    pattern: /->|@|<-|~>|<\+|\+>|\$<|=>|<:|::|%|&!?|~|!|\$(?:env|iam|runtime|config)|>>/,
    greedy: true,
    alias: 'operator'
  },
  // Keywords
  'keyword': /\b(?:@import|as|optional|required)\b/,
  // Type references
  'type': {
    pattern: /(?<=:\s*)\w+(?:\[\])?/,
    greedy: true,
    alias: 'builtin'
  },
  // Version numbers
  'version': {
    pattern: /v\d+\.\d+\.\d+/,
    greedy: true,
    alias: 'number'
  },
  // File paths
  'path': {
    pattern: /(?<=@\s)[\w\/.-]+(?=:)/,
    greedy: true,
    alias: 'string'
  },
  // Import paths
  'import-path': {
    pattern: /(?<=@import\s")[^"]+(?=")/,
    greedy: true,
    alias: 'string'
  },
  // Field names in DTOs
  'field': {
    pattern: /(?<=^\s*-)\s*\w+(?=:)/m,
    greedy: true,
    alias: 'property'
  },
  // List items in brackets
  'list-item': {
    pattern: /(?<=[\[<>])\s*\w+(?:\s*,\s*\w+)*(?=\s*[\]<>])/,
    inside: {
      'punctuation': /,/
    }
  },
  'punctuation': /[{}[\](),.;:<>=-]/,
  'builtin': /\b(?:string|number|boolean|Date|void|any)\b/
};

// TypedMind validation logic
function validateTypedMind(code) {
  const errors = [];
  const lines = code.split('\n');
  
  // Track entities for reference validation
  const entities = {
    programs: new Set(),
    files: new Set(),
    classes: new Set(),
    functions: new Set(),
    dtos: new Set(),
    uicomponents: new Set(),
    assets: new Set(),
    constants: new Set(),
    runparameters: new Set()
  };
  
  // Track references
  const references = [];
  const functionCalls = [];
  const uiAffects = [];
  
  // Check for program declaration
  const programMatch = code.match(/(\w+)\s*->\s*(\w+)\s+v[\d.]+/);
  if (!programMatch) {
    errors.push('Missing program declaration (Format: ProgramName -> entryFile v1.0.0)');
  } else {
    entities.programs.add(programMatch[1]);
  }
  
  // Basic syntax validation
  let braceCount = 0;
  let inString = false;
  let currentEntity = null;
  let currentEntityType = null;
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('//')) return;
    
    // Check for string literals
    for (let char of line) {
      if (char === '"' && line[line.indexOf(char) - 1] !== '\\') {
        inString = !inString;
      }
      if (!inString) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }
    }
    
    // Entity declarations
    const fileMatch = trimmedLine.match(/(\w+)\s*@\s*([\w./]+):/);
    if (fileMatch) {
      entities.files.add(fileMatch[1]);
      currentEntity = fileMatch[1];
      currentEntityType = 'file';
    }
    
    const classMatch = trimmedLine.match(/(\w+)\s*<:/);
    if (classMatch) {
      entities.classes.add(classMatch[1]);
      currentEntity = classMatch[1];
      currentEntityType = 'class';
    }
    
    const functionMatch = trimmedLine.match(/(\w+)\s*::/);
    if (functionMatch) {
      entities.functions.add(functionMatch[1]);
      currentEntity = functionMatch[1];
      currentEntityType = 'function';
    }
    
    const dtoMatch = trimmedLine.match(/(\w+)\s*%/);
    if (dtoMatch) {
      entities.dtos.add(dtoMatch[1]);
      currentEntity = dtoMatch[1];
      currentEntityType = 'dto';
    }
    
    const uiComponentMatch = trimmedLine.match(/(\w+)\s*&!?/);
    if (uiComponentMatch) {
      entities.uicomponents.add(uiComponentMatch[1]);
      currentEntity = uiComponentMatch[1];
      currentEntityType = 'uicomponent';
    }
    
    const assetMatch = trimmedLine.match(/(\w+)\s*~/);
    if (assetMatch && !trimmedLine.includes('~>')) {
      entities.assets.add(assetMatch[1]);
      currentEntity = assetMatch[1];
      currentEntityType = 'asset';
    }
    
    const constantMatch = trimmedLine.match(/(\w+)\s*!/);
    if (constantMatch) {
      entities.constants.add(constantMatch[1]);
    }
    
    const runParamMatch = trimmedLine.match(/(\w+)\s*\$(env|iam|runtime|config)/);
    if (runParamMatch) {
      entities.runparameters.add(runParamMatch[1]);
    }
    
    // Reference tracking for various relationships
    
    // Function calls (~>)
    const callsMatch = trimmedLine.match(/~>\s*\[([^\]]+)\]/);
    if (callsMatch && currentEntityType === 'function') {
      const calls = callsMatch[1].split(',').map(s => s.trim());
      calls.forEach(call => {
        functionCalls.push({
          line: lineNum,
          source: currentEntity,
          target: call
        });
      });
    }
    
    // UI affects (+>)
    const affectsMatch = trimmedLine.match(/\+>\s*\[([^\]]+)\]/);
    if (affectsMatch && currentEntityType === 'function') {
      const affects = affectsMatch[1].split(',').map(s => s.trim());
      affects.forEach(component => {
        uiAffects.push({
          line: lineNum,
          source: currentEntity,
          target: component,
          type: 'affects'
        });
      });
    }
    
    // UI containment (>)
    const containsMatch = trimmedLine.match(/>\s*\[([^\]]+)\]/);
    if (containsMatch && currentEntityType === 'uicomponent' && !trimmedLine.includes('+>')) {
      const contains = containsMatch[1].split(',').map(s => s.trim());
      contains.forEach(child => {
        references.push({
          line: lineNum,
          source: currentEntity,
          target: child,
          type: 'contains'
        });
      });
    }
    
    // Type references in function signatures and DTO fields
    const typeMatches = trimmedLine.match(/:\s*(\w+)(?:\[\])?/g);
    if (typeMatches && (currentEntityType === 'function' || currentEntityType === 'dto')) {
      typeMatches.forEach(match => {
        const typeName = match.replace(/:\s*/, '').replace('[]', '');
        if (!isBuiltinType(typeName) && !entities.dtos.has(typeName)) {
          // Check for forward references in the entire code
          const dtoPattern = new RegExp(`${typeName}\\s*%`);
          if (!dtoPattern.test(code)) {
            errors.push(`Line ${lineNum}: Type '${typeName}' not found`);
          }
        }
      });
    }
  });
  
  // Check brace matching
  if (braceCount !== 0) {
    errors.push(`Mismatched braces: ${braceCount > 0 ? 'missing closing' : 'extra closing'} brace(s)`);
  }
  
  // Validate function calls
  functionCalls.forEach(ref => {
    if (!entities.functions.has(ref.target)) {
      errors.push(`Line ${ref.line}: Function '${ref.target}' not found (called by ${ref.source})`);
    }
  });
  
  // Validate UI affects
  uiAffects.forEach(ref => {
    if (!entities.uicomponents.has(ref.target)) {
      errors.push(`Line ${ref.line}: UI Component '${ref.target}' not found (affected by ${ref.source})`);
    }
  });
  
  // Validate UI containment
  references.forEach(ref => {
    if (ref.type === 'contains' && !entities.uicomponents.has(ref.target)) {
      errors.push(`Line ${ref.line}: UI Component '${ref.target}' not found (contained by ${ref.source})`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

function isBuiltinType(type) {
  const builtinTypes = ['string', 'number', 'boolean', 'Date', 'void', 'any'];
  return builtinTypes.includes(type);
}

// Initialize Prism highlighting for TypedMind
document.addEventListener('DOMContentLoaded', () => {
  // Highlight all TypedMind code blocks
  Prism.highlightAll();
  
  // Re-highlight playground editor on input
  const codeEditor = document.getElementById('codeEditor');
  if (codeEditor) {
    codeEditor.addEventListener('input', () => {
      // For better performance, we could implement syntax highlighting
      // in the textarea itself, but for now we rely on validation feedback
    });
  }
});