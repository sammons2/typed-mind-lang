#!/usr/bin/env node

import { GrammarDocGenerator } from './grammar-doc-generator';
import { writeFileSync } from 'fs';
import { join } from 'path';

const generator = new GrammarDocGenerator();

// Generate markdown documentation
const markdown = generator.generateMarkdown();
const mdPath = join(__dirname, '..', 'generated-grammar.md');
writeFileSync(mdPath, markdown);
console.log(`✅ Generated Markdown grammar documentation: ${mdPath}`);

// Generate JSON representation
const json = generator.generateJSON();
const jsonPath = join(__dirname, '..', 'grammar.json');
writeFileSync(jsonPath, json);
console.log(`✅ Generated JSON grammar representation: ${jsonPath}`);

// Generate EBNF notation
const ebnf = generator.generateEBNF();
const ebnfPath = join(__dirname, '..', 'grammar.ebnf');
writeFileSync(ebnfPath, ebnf);
console.log(`✅ Generated EBNF grammar notation: ${ebnfPath}`);

console.log('\n📚 Grammar documentation generated successfully!');