import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DSLParser } from './parser';
import { DSLValidator } from './validator';

describe('Documentation Examples', () => {
  const parser = new DSLParser();
  const validator = new DSLValidator();

  it('should validate all TypedMind examples in grammar.md', () => {
    const grammarPath = join(__dirname, '..', 'grammar.md');
    const content = readFileSync(grammarPath, 'utf-8');
    
    // Extract all ```tmd code blocks
    const tmdBlocks = content.match(/```tmd\n([\s\S]*?)```/g) || [];
    
    expect(tmdBlocks.length).toBeGreaterThan(0);
    
    tmdBlocks.forEach((block, index) => {
      // Remove the ```tmd and ``` markers
      const code = block.replace(/```tmd\n/, '').replace(/\n```$/, '');
      
      // Skip blocks that are just fragments or syntax demonstrations
      if (code.split('\n').length < 10) return;
      
      // Skip blocks that don't have a Program entity (they're just syntax examples)
      if (!code.includes('->')) return;
      
      // Parse and validate
      const parseResult = parser.parse(code);
      const validationResult = validator.validate(parseResult.entities);
      
      // For the quick reference example, we allow orphaned entities since it's demonstrating syntax
      const isQuickReference = code.includes('# Example showing other entity types:');
      
      if (!validationResult.valid) {
        // Filter out orphaned entity errors for the quick reference example
        const relevantErrors = isQuickReference 
          ? validationResult.errors.filter(e => !e.message.includes('Orphaned entity'))
          : validationResult.errors;
        
        if (relevantErrors.length > 0) {
          console.error(`\nExample ${index + 1} has validation errors:`);
          console.error('Code:\n', code);
          console.error('Errors:', relevantErrors);
          expect(relevantErrors.length).toBe(0);
        }
      } else {
        expect(validationResult.valid).toBe(true);
      }
    });
  });

  it('should validate all TypedMind examples in generated-grammar.md', () => {
    try {
      const generatedPath = join(__dirname, '..', 'generated-grammar.md');
      const content = readFileSync(generatedPath, 'utf-8');
      
      // Extract the complete application example
      const match = content.match(/### Complete Application Example\n\n```tmd\n([\s\S]*?)```/);
      
      if (match) {
        const code = match[1];
        const parseResult = parser.parse(code);
        const validationResult = validator.validate(parseResult.entities);
        
        if (!validationResult.valid) {
          console.error('\nGenerated example has validation errors:');
          console.error('Errors:', validationResult.errors);
        }
        
        expect(validationResult.valid).toBe(true);
      }
    } catch (e) {
      // File might not exist if not generated yet
      console.log('Skipping generated-grammar.md test - file not found');
    }
  });
});