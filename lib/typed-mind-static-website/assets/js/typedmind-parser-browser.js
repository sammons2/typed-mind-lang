// TypedMind Parser - Browser Bundle
// Simplified browser-compatible version of the TypedMind parser

(function(global) {
  'use strict';

  // Entity patterns for parsing
  const ENTITY_PATTERNS = {
    PROGRAM: /^(\w+)\s*->\s*(\w+)(?:\s+"([^"]+)")?(?:\s+v([\d.]+))?$/,
    FILE: /^(\w+)\s*@\s*([^:]+):/,
    FUNCTION: /^(\w+)\s*::\s*(.+)$/,
    CLASS: /^(\w+)\s*<:\s*(.*)$/,
    CONSTANTS: /^(\w+)\s*!\s*([^:]+)(?:\s*:\s*(\w+))?$/,
    DTO_WITH_PURPOSE: /^(\w+)\s*%\s*"([^"]+)"$/,
    DTO_SIMPLE: /^(\w+)\s*%$/,
    ASSET: /^(\w+)\s*~\s*"([^"]+)"$/,
    UI_COMPONENT: /^(\w+)\s*(&!?)\s*"([^"]+)"$/,
    RUN_PARAMETER: /^(\w+)\s*\$(\w+)\s*"([^"]+)"\s*\(([^)]+)\)$/,
    DEPENDENCY: /^(@?\w+(?:\/\w+)?)\s*\^\s*"([^"]+)"(?:\s+v([\d.]+))?$/,
    LONGFORM_ENTITY: /^(\w+)\s*\{$/,
    LONGFORM_TYPE: /^\s*type:\s*(\w+)$/
  };

  const CONTINUATION_PATTERNS = {
    DTO_FIELD: /^-\s*(\w+):\s*(\w+)(?:\s*"([^"]+)")?(?:\s*\(([^)]+)\))?$/,
    COMMENT: /^#\s*(.*)$/,
    DESCRIPTION: /^"([^"]+)"$/,
    DEFAULT_VALUE: /^=\s*"([^"]+)"$/,
    CONSUMES: /^\$<\s*\[([^\]]+)\]$/
  };

  const GENERAL_PATTERNS = {
    ENTITY_DECLARATION: /^\w+\s*[-@:<%!~&$^]\s*/,
    LONGFORM_DECLARATION: /^\w+\s*\{/,
    CONTINUATION: /^\s*[-<>=~$#"]/,
    INLINE_COMMENT: /^([^#]*?)#(.*)$/,
    IMPORT_STATEMENT: /^(?:@import|import)\s+"([^"]+)"(?:\s+as\s+(\w+))?$/
  };

  // Simple parser class
  class TypedMindParser {
    constructor() {
      this.lines = [];
      this.entities = new Map();
      this.imports = [];
      this.errors = [];
    }

    parse(input) {
      this.lines = input.split('\n');
      this.entities.clear();
      this.imports = [];
      this.errors = [];

      let currentEntity = null;

      for (let lineNum = 0; lineNum < this.lines.length; lineNum++) {
        try {
          const line = this.lines[lineNum];
          if (!line) continue;
          const trimmed = line.trim();

          // Skip empty lines and comments
          if (!trimmed || trimmed.startsWith('#')) continue;

          // Check for import statements
          if (trimmed.startsWith('@import') || trimmed.startsWith('import ')) {
            this.parseImport(trimmed, lineNum + 1);
            continue;
          }

          // Check for continuation of previous entity
          if (currentEntity && this.isContinuation(line)) {
            this.parseContinuation(currentEntity, trimmed, lineNum + 1);
            continue;
          }

          // Detect entity declarations
          if (this.isEntityDeclaration(trimmed)) {
            currentEntity = this.parseEntity(trimmed, lineNum + 1);
            if (currentEntity) {
              this.entities.set(currentEntity.name, currentEntity);
            }
          } else {
            currentEntity = null;
          }
        } catch (error) {
          this.errors.push({
            line: lineNum + 1,
            column: 1,
            message: error.message,
            severity: 'error'
          });
        }
      }

      return {
        entities: this.entities,
        imports: this.imports,
        errors: this.errors
      };
    }

    isEntityDeclaration(line) {
      return GENERAL_PATTERNS.ENTITY_DECLARATION.test(line);
    }

    isContinuation(line) {
      return GENERAL_PATTERNS.CONTINUATION.test(line);
    }

    parseEntity(line, lineNum) {
      const position = { line: lineNum, column: 1 };
      const { cleanLine, comment } = this.extractInlineComment(line);

      // Try to match different entity types
      let match;

      // Program: AppName -> EntryFile v1.0.0
      if ((match = cleanLine.match(ENTITY_PATTERNS.PROGRAM))) {
        return {
          name: match[1],
          type: 'Program',
          entry: match[2],
          purpose: match[3],
          version: match[4],
          position,
          raw: line,
          comment
        };
      }

      // File: UserService @ src/services/user.ts:
      if ((match = cleanLine.match(ENTITY_PATTERNS.FILE))) {
        return {
          name: match[1],
          type: 'File',
          path: match[2]?.trim(),
          imports: [],
          exports: [],
          position,
          raw: line,
          comment
        };
      }

      // Function: createUser :: (data: UserInput) => Promise<User>
      if ((match = cleanLine.match(ENTITY_PATTERNS.FUNCTION))) {
        return {
          name: match[1],
          type: 'Function',
          signature: match[2]?.trim(),
          calls: [],
          position,
          raw: line,
          comment
        };
      }

      // Class: UserController <: BaseController, IController
      if ((match = cleanLine.match(ENTITY_PATTERNS.CLASS))) {
        const inheritance = match[2]?.trim();
        let baseClass;
        let interfaces = [];
        
        if (inheritance) {
          const parts = inheritance.split(',').map(s => s.trim());
          if (parts.length > 0 && parts[0]) {
            baseClass = parts[0];
            interfaces = parts.slice(1);
          }
        }
        
        return {
          name: match[1],
          type: 'Class',
          extends: baseClass,
          implements: interfaces,
          methods: [],
          position,
          raw: line,
          comment
        };
      }

      // DTO: UserDTO % "User data transfer object"
      if ((match = cleanLine.match(ENTITY_PATTERNS.DTO_WITH_PURPOSE))) {
        return {
          name: match[1],
          type: 'DTO',
          purpose: match[2],
          fields: [],
          position,
          raw: line,
          comment
        };
      }

      // DTO without purpose: UserDTO %
      if ((match = cleanLine.match(ENTITY_PATTERNS.DTO_SIMPLE))) {
        return {
          name: match[1],
          type: 'DTO',
          fields: [],
          position,
          raw: line,
          comment
        };
      }

      // Other entity types...
      return null;
    }

    parseContinuation(entity, line, lineNum) {
      let match;

      // Imports: <- [Database, UserModel]
      if ((match = line.match(/^<-\s*\[([^\]]+)\]/))) {
        if ('imports' in entity) {
          entity.imports = this.parseList(match[1]);
        }
        return;
      }

      // Exports: -> [createUser, getUser]
      if ((match = line.match(/^->\s*\[([^\]]+)\]/))) {
        if ('exports' in entity) {
          entity.exports = this.parseList(match[1]);
        }
        return;
      }

      // DTO Fields: - fieldName: type "description" (optional)
      if ((match = line.match(CONTINUATION_PATTERNS.DTO_FIELD))) {
        if (entity.type === 'DTO') {
          const field = {
            name: match[1],
            type: match[2]?.trim(),
            description: match[3],
            optional: match[4]?.includes('optional') || false
          };
          entity.fields.push(field);
        }
        return;
      }
    }

    parseList(listStr) {
      return listStr.split(',').map(item => item.trim());
    }

    extractInlineComment(line) {
      const match = line.match(GENERAL_PATTERNS.INLINE_COMMENT);
      if (match) {
        return {
          cleanLine: match[1]?.trim(),
          comment: match[2]?.trim()
        };
      }
      return { cleanLine: line };
    }

    parseImport(line, lineNum) {
      const match = line.match(GENERAL_PATTERNS.IMPORT_STATEMENT);
      if (match) {
        this.imports.push({
          path: match[1],
          alias: match[2],
          position: { line: lineNum, column: 1 }
        });
      }
    }
  }

  // Export to global scope
  global.TypedMindParser = TypedMindParser;

})(this);