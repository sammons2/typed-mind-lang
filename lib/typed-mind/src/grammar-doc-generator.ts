import { 
  ENTITY_PATTERNS, 
  CONTINUATION_PATTERNS, 
  GENERAL_PATTERNS,
  PATTERN_DESCRIPTIONS,
  ENTITY_TYPE_NAMES 
} from './parser-patterns';

const explanation = `
## Note from Author
TypedMind is meant to be a DSL to represent a variety of programs and
force AI to create a cohesive program architecture with a relatively token efficient syntax.

Entities link bidirectionally, so for example it is not enough to declare a function,
the file must also be declared. The function must be exported by a file. And the function must be 
consumed by another entity to avoid dead code. The TypeMind checker will validate these scenarios.
`;

export class GrammarDocGenerator {
  generateMarkdown(): string {
    const sections: string[] = [];

    // Header
    sections.push('# TypedMind DSL Grammar Reference');
    sections.push('');
    sections.push('This document is auto-generated from the parser patterns.');
    sections.push('');
    
    // Add the explanation
    sections.push(explanation.trim());
    sections.push('');

    // Table of Contents
    sections.push('## Table of Contents');
    sections.push('');
    sections.push('1. [Entity Types](#entity-types)');
    sections.push('2. [Entity Patterns](#entity-patterns)');
    sections.push('3. [Continuation Patterns](#continuation-patterns)');
    sections.push('4. [General Patterns](#general-patterns)');
    sections.push('5. [Examples](#examples)');
    sections.push('');

    // Entity Types
    sections.push('## Entity Types');
    sections.push('');
    sections.push('TypedMind supports the following entity types:');
    sections.push('');
    sections.push('| Entity Type | Description |');
    sections.push('|------------|-------------|');
    
    const entityDescriptions: Record<string, string> = {
      'Program': 'Defines an application entry point',
      'File': 'Defines a source code file',
      'Function': 'Defines a function with its type signature',
      'Class': 'Defines a class with inheritance',
      'Constants': 'Defines a constants/configuration file',
      'DTO': 'Defines a Data Transfer Object',
      'Asset': 'Defines a static asset',
      'UIComponent': 'Defines a UI component (&! for root)',
      'RunParameter': 'Defines a runtime parameter',
      'Dependency': 'Defines an external dependency'
    };
    
    for (const typeName of ENTITY_TYPE_NAMES) {
      const desc = entityDescriptions[typeName];
      if (desc) {
        sections.push(`| ${typeName} | ${desc} |`);
      }
    }
    sections.push('');

    // Entity Patterns
    sections.push('## Entity Patterns');
    sections.push('');
    sections.push('### Shortform Syntax Patterns');
    sections.push('');

    for (const [name, pattern] of Object.entries(ENTITY_PATTERNS)) {
      const desc = PATTERN_DESCRIPTIONS[name as keyof typeof PATTERN_DESCRIPTIONS];
      if (desc) {
        sections.push(`#### ${this.formatPatternName(name)}`);
        sections.push('');
        sections.push(`**Pattern:** \`${desc.pattern}\``);
        sections.push('');
        sections.push(`**Example:** \`${desc.example}\``);
        sections.push('');
        sections.push(`**Description:** ${desc.description}`);
        sections.push('');
        sections.push(`**Regex:** \`${pattern.source}\``);
        sections.push('');
      }
    }

    // Continuation Patterns
    sections.push('## Continuation Patterns');
    sections.push('');
    sections.push('These patterns match continuation lines that add properties to entities:');
    sections.push('');
    sections.push('| Pattern | Description | Example |');
    sections.push('|---------|-------------|---------|');
    
    const continuationInfo: Record<string, { desc: string; example: string }> = {
      IMPORTS: { desc: 'Entity imports', example: '<- [Database, UserModel]' },
      EXPORTS: { desc: 'Entity exports', example: '-> [createUser, getUser]' },
      CALLS: { desc: 'Function calls', example: '~> [validate, save]' },
      INPUT: { desc: 'Function input DTO', example: '<- UserCreateDTO' },
      OUTPUT: { desc: 'Function output DTO', example: '-> UserDTO' },
      METHODS: { desc: 'Class methods', example: '=> [create, read, update]' },
      AFFECTS: { desc: 'Function affects UI', example: '~ [UserList, UserForm]' },
      CONTAINS: { desc: 'UI component contains', example: '> [Header, Footer]' },
      CONTAINED_BY: { desc: 'UI component parent', example: '< [Dashboard]' },
      CONTAINS_PROGRAM: { desc: 'Asset contains program', example: '>> ClientApp' },
      DTO_FIELD: { desc: 'DTO field definition', example: '- name: string "User name"' },
      COMMENT: { desc: 'Comment line', example: '# This is a comment' },
      DESCRIPTION: { desc: 'Entity description', example: '"Creates a new user"' },
      DEFAULT_VALUE: { desc: 'Parameter default', example: '= "default-value"' },
      CONSUMES: { desc: 'Function consumes params', example: '$< [DATABASE_URL, API_KEY]' },
    };

    for (const [name] of Object.entries(CONTINUATION_PATTERNS)) {
      const info = continuationInfo[name];
      if (info) {
        sections.push(`| ${this.formatPatternName(name)} | ${info.desc} | \`${info.example}\` |`);
      }
    }
    sections.push('');

    // General Patterns
    sections.push('## General Patterns');
    sections.push('');
    sections.push('These patterns are used for general parsing tasks:');
    sections.push('');

    const generalInfo: Record<string, string> = {
      ENTITY_DECLARATION: 'Detects any entity declaration line',
      LONGFORM_DECLARATION: 'Detects longform syntax declarations',
      CONTINUATION: 'Detects continuation lines for entity properties',
      IMPORT_STATEMENT: 'Matches import statements (@import or import)',
      INLINE_COMMENT: 'Extracts inline comments from lines',
    };

    for (const [name, pattern] of Object.entries(GENERAL_PATTERNS)) {
      const desc = generalInfo[name];
      if (desc) {
        sections.push(`### ${this.formatPatternName(name)}`);
        sections.push('');
        sections.push(`**Description:** ${desc}`);
        sections.push('');
        sections.push(`**Regex:** \`${pattern.source}\``);
        sections.push('');
      }
    }

    // Examples
    sections.push('## Examples');
    sections.push('');
    sections.push('### Complete Application Example');
    sections.push('');
    sections.push('```tmd');
    sections.push('# Program definition');
    sections.push('TodoApp -> main "Main todo application" v1.0.0');
    sections.push('');
    sections.push('# Entry file');
    sections.push('main @ src/index.ts:');
    sections.push('  <- [App]');
    sections.push('  -> [startApp]');
    sections.push('  "Application entry point"');
    sections.push('');
    sections.push('# Start function');
    sections.push('startApp :: () => void');
    sections.push('  "Starts the application"');
    sections.push('  ~ [App]');
    sections.push('  $< [DATABASE_URL, API_KEY]');
    sections.push('');
    sections.push('# UI Components');
    sections.push('App &! "Root application component"');
    sections.push('  > [TodoList, AddTodoForm]');
    sections.push('');
    sections.push('TodoList & "Displays list of todos"');
    sections.push('  < [App]');
    sections.push('');
    sections.push('AddTodoForm & "Form to add new todos"');
    sections.push('  < [App]');
    sections.push('');
    sections.push('# Runtime parameters');
    sections.push('DATABASE_URL $env "PostgreSQL connection string" (required)');
    sections.push('API_KEY $env "API authentication key"');
    sections.push('  = "default-key"');
    sections.push('');
    sections.push('# Dependencies');
    sections.push('react ^ "UI library" v18.0.0');
    sections.push('typescript ^ "TypeScript compiler" v5.0.0');
    sections.push('```');

    return sections.join('\n');
  }

  generateJSON(): string {
    const grammar = {
      entityTypes: ENTITY_TYPE_NAMES,
      patterns: {
        entity: this.patternsToJSON(ENTITY_PATTERNS),
        continuation: this.patternsToJSON(CONTINUATION_PATTERNS),
        general: this.patternsToJSON(GENERAL_PATTERNS),
      },
      descriptions: PATTERN_DESCRIPTIONS,
    };

    return JSON.stringify(grammar, null, 2);
  }

  generateEBNF(): string {
    const lines: string[] = [];

    lines.push('(* TypedMind DSL Grammar in EBNF notation *)');
    lines.push('');
    lines.push('(* Document Structure *)');
    lines.push('document = (import_statement | entity | comment | empty_line)*;');
    lines.push('');
    lines.push('(* Import Statements *)');
    lines.push('import_statement = ("@import" | "import") string_literal ["as" identifier];');
    lines.push('');
    lines.push('(* Entity Declarations *)');
    lines.push('entity = program | file | function | class | dto | asset | component | parameter | dependency | constants;');
    lines.push('');
    lines.push('(* Program Entity *)');
    lines.push('program = identifier "->" identifier [string_literal] ["v" version];');
    lines.push('version = digit+ "." digit+ "." digit+;');
    lines.push('');
    lines.push('(* File Entity *)');
    lines.push('file = identifier "@" path ":" [file_body];');
    lines.push('file_body = (imports | exports | description)*;');
    lines.push('imports = "<-" "[" identifier_list "]";');
    lines.push('exports = "->" "[" identifier_list "]";');
    lines.push('');
    lines.push('(* Function Entity *)');
    lines.push('function = identifier "::" signature [function_body];');
    lines.push('function_body = (description | input | output | calls | affects | consumes)*;');
    lines.push('input = "<-" identifier;');
    lines.push('output = "->" identifier;');
    lines.push('calls = "~>" "[" identifier_list "]";');
    lines.push('affects = "~" "[" identifier_list "]";');
    lines.push('consumes = "$<" "[" identifier_list "]";');
    lines.push('');
    lines.push('(* Class Entity *)');
    lines.push('class = identifier "<:" [identifier] ["," identifier_list] [class_body];');
    lines.push('class_body = (methods | description)*;');
    lines.push('methods = "=>" "[" identifier_list "]";');
    lines.push('');
    lines.push('(* DTO Entity *)');
    lines.push('dto = identifier "%" [string_literal] [dto_body];');
    lines.push('dto_body = field_definition*;');
    lines.push('field_definition = "-" identifier ["?"] ":" type [string_literal] ["(" "optional" ")"];');
    lines.push('');
    lines.push('(* Asset Entity *)');
    lines.push('asset = identifier "~" string_literal [asset_body];');
    lines.push('asset_body = (contains_program)*;');
    lines.push('contains_program = ">>" identifier;');
    lines.push('');
    lines.push('(* UIComponent Entity *)');
    lines.push('component = identifier ("&" | "&!") string_literal [component_body];');
    lines.push('component_body = (contains | contained_by)*;');
    lines.push('contains = ">" "[" identifier_list "]";');
    lines.push('contained_by = "<" "[" identifier_list "]";');
    lines.push('');
    lines.push('(* RunParameter Entity *)');
    lines.push('parameter = identifier "$" param_type string_literal ["(" "required" ")"] [default_value];');
    lines.push('param_type = "env" | "iam" | "runtime" | "config";');
    lines.push('default_value = "=" string_literal;');
    lines.push('');
    lines.push('(* Dependency Entity *)');
    lines.push('dependency = identifier "^" string_literal ["v" version_spec];');
    lines.push('');
    lines.push('(* Constants Entity *)');
    lines.push('constants = identifier "!" path [":" identifier];');
    lines.push('');
    lines.push('(* Common Elements *)');
    lines.push('identifier = letter (letter | digit | "_")*;');
    lines.push('identifier_list = identifier ("," identifier)*;');
    lines.push('string_literal = \'"\' character* \'"\';');
    lines.push('path = string_literal;');
    lines.push('type = identifier;');
    lines.push('signature = "(" [parameters] ")" "=>" return_type;');
    lines.push('description = string_literal;');
    lines.push('comment = "#" character*;');
    lines.push('empty_line = whitespace*;');

    return lines.join('\n');
  }

  private formatPatternName(name: string): string {
    return name
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }

  private patternsToJSON(patterns: Record<string, RegExp>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [name, pattern] of Object.entries(patterns)) {
      result[name] = pattern.source;
    }
    return result;
  }
}