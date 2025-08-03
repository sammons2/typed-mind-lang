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
    LONGFORM_ENTITY: /^(?:program|file|function|class|dto|component|constants|asset|dependency|runParameter)\s+(\w+)\s*\{$/,
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
    LONGFORM_DECLARATION: /^(?:program|file|function|class|dto|component|constants|asset|dependency|runParameter)\s+\w+\s*\{/,
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
      this.braceStack = []; // Track open braces for longform parsing
    }

    parse(input) {
      this.lines = input.split('\n');
      this.entities.clear();
      this.imports = [];
      this.errors = [];
      this.braceStack = [];

      let currentEntity = null;

      for (let lineNum = 0; lineNum < this.lines.length; lineNum++) {
        try {
          const line = this.lines[lineNum];
          if (!line) continue;
          const trimmed = line.trim();

          // Skip empty lines and comments
          if (!trimmed || trimmed.startsWith('#')) continue;

          // Check for closing brace (end of longform entity)
          if (trimmed === '}') {
            if (this.braceStack.length > 0) {
              const entityInfo = this.braceStack.pop();
              // Entity is already stored, just mark it as complete
              currentEntity = null;
            }
            continue;
          }

          // Check for import statements
          if (trimmed.startsWith('@import') || trimmed.startsWith('import ')) {
            this.parseImport(trimmed, lineNum + 1);
            continue;
          }

          // Check for continuation of previous entity (inside braces or shortform)
          if (currentEntity && (this.braceStack.length > 0 || this.isContinuation(line))) {
            this.parseContinuation(currentEntity, trimmed, lineNum + 1);
            continue;
          }

          // Detect entity declarations
          if (this.isEntityDeclaration(trimmed) || this.isLongformEntityStart(trimmed)) {
            currentEntity = this.parseEntity(trimmed, lineNum + 1);
            if (currentEntity) {
              this.entities.set(currentEntity.name, currentEntity);
              
              // If it's a longform entity, push to brace stack
              if (trimmed.includes('{')) {
                this.braceStack.push({ entity: currentEntity, startLine: lineNum + 1 });
              }
            }
          } else {
            // Only clear current entity if we're not inside braces
            if (this.braceStack.length === 0) {
              currentEntity = null;
            }
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

      // Check for unclosed braces
      if (this.braceStack.length > 0) {
        this.braceStack.forEach(item => {
          this.errors.push({
            line: item.startLine,
            column: 1,
            message: `Unclosed brace for entity '${item.entity.name}'`,
            severity: 'error'
          });
        });
      }

      // Check for orphaned entities (entities that aren't referenced anywhere)
      this.validateOrphanedEntities();

      return {
        entities: this.entities,
        imports: this.imports,
        errors: this.errors
      };
    }

    isEntityDeclaration(line) {
      return GENERAL_PATTERNS.ENTITY_DECLARATION.test(line);
    }

    isLongformEntityStart(line) {
      return GENERAL_PATTERNS.LONGFORM_DECLARATION.test(line);
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

      // UI Component: AppComponent &! "Root component" or &! "Component"
      if ((match = cleanLine.match(ENTITY_PATTERNS.UI_COMPONENT))) {
        return {
          name: match[1],
          type: 'UIComponent',
          root: match[2] === '&!',
          purpose: match[3],
          contains: [],
          containedBy: [],
          position,
          raw: line,
          comment
        };
      }

      // Asset: logo ~ "Company logo"
      if ((match = cleanLine.match(ENTITY_PATTERNS.ASSET))) {
        return {
          name: match[1],
          type: 'Asset',
          purpose: match[2],
          position,
          raw: line,
          comment
        };
      }

      // Constants: API_KEY ! config/secrets.json : string
      if ((match = cleanLine.match(ENTITY_PATTERNS.CONSTANTS))) {
        return {
          name: match[1],
          type: 'Constants',
          path: match[2]?.trim(),
          schema: match[3],
          position,
          raw: line,
          comment
        };
      }

      // Run Parameter: DATABASE_URL $ string "Database connection string" (optional)
      if ((match = cleanLine.match(ENTITY_PATTERNS.RUN_PARAMETER))) {
        return {
          name: match[1],
          type: 'RunParameter',
          schema: match[2],
          purpose: match[3],
          optional: match[4]?.includes('optional') || false,
          position,
          raw: line,
          comment
        };
      }

      // Dependency: @express ^ "Web framework" v4.18.0
      if ((match = cleanLine.match(ENTITY_PATTERNS.DEPENDENCY))) {
        return {
          name: match[1],
          type: 'Dependency',
          purpose: match[2],
          version: match[3],
          position,
          raw: line,
          comment
        };
      }

      // Longform entity (keyword entityname {)
      if ((match = cleanLine.match(ENTITY_PATTERNS.LONGFORM_ENTITY))) {
        const name = match[1];
        
        // Extract keyword from the line to determine entity type
        const keywordMatch = cleanLine.match(/^(program|file|function|class|dto|component|constants|asset|dependency|runParameter)\s+/);
        let inferredType = 'Unknown';
        
        if (keywordMatch) {
          const keyword = keywordMatch[1];
          switch (keyword) {
            case 'program':
              inferredType = 'Program';
              break;
            case 'file':
              inferredType = 'File';
              break;
            case 'function':
              inferredType = 'Function';
              break;
            case 'class':
              inferredType = 'Class';
              break;
            case 'dto':
              inferredType = 'DTO';
              break;
            case 'component':
              inferredType = 'UIComponent';
              break;
            case 'constants':
              inferredType = 'Constants';
              break;
            case 'asset':
              inferredType = 'Asset';
              break;
            case 'dependency':
              inferredType = 'Dependency';
              break;
            case 'runParameter':
              inferredType = 'RunParameter';
              break;
          }
        }
        
        // Create a placeholder entity - will be filled by continuations
        return {
          name: name,
          type: inferredType, // Will be updated by type: property if present
          position,
          raw: line,
          comment,
          fields: [], // Initialize common properties
          imports: [],
          exports: [],
          methods: [],
          calls: []
        };
      }

      return null;
    }

    parseContinuation(entity, line, lineNum) {
      let match;

      // Longform type declaration: type: Program
      if ((match = line.match(ENTITY_PATTERNS.LONGFORM_TYPE))) {
        entity.type = match[1];
        return;
      }

      // Longform properties
      if ((match = line.match(/^\s*(\w+):\s*(.+)$/))) {
        const property = match[1];
        const value = match[2]?.trim();
        
        switch (property) {
          case 'entryPoint':
            entity.entry = value;
            break;
          case 'version':
            entity.version = value.replace(/['"]/g, '');
            break;
          case 'path':
            entity.path = value.replace(/['"]/g, '');
            break;
          case 'description':
            entity.description = value.replace(/['"]/g, '');
            entity.purpose = value.replace(/['"]/g, ''); // Also set purpose for DTOs
            break;
          case 'signature':
            entity.signature = value.replace(/['"]/g, '');
            break;
          case 'extends':
            entity.extends = value;
            break;
          case 'root':
            entity.root = value === 'true';
            break;
          case 'imports':
            entity.imports = this.parseListProperty(value);
            break;
          case 'exports':
            entity.exports = this.parseListProperty(value);
            break;
          case 'methods':
            entity.methods = this.parseListProperty(value);
            break;
          case 'calls':
            entity.calls = this.parseListProperty(value);
            break;
          case 'affects':
            entity.affects = this.parseListProperty(value);
            break;
          case 'contains':
            entity.contains = this.parseListProperty(value);
            break;
          case 'containedBy':
            entity.containedBy = this.parseListProperty(value);
            break;
          case 'fields':
            // For longform field definitions, parse the array
            if (value.startsWith('[') && value.endsWith(']')) {
              // Parse array of field objects
              try {
                // Handle simple cases like [{ name: "id", type: "string" }]
                const fieldStr = value.slice(1, -1).trim(); // Remove brackets
                if (fieldStr) {
                  if (!entity.fields) entity.fields = [];
                  // This will be handled by subsequent field object parsing
                }
              } catch (error) {
                // Ignore parsing errors for now
              }
            }
            break;
          case 'input':
            entity.input = value;
            break;
          case 'output':
            entity.output = value;
            break;
          case 'purpose':
            entity.purpose = value.replace(/['"]/g, '');
            break;
          case 'consumes':
            entity.consumes = this.parseListProperty(value);
            break;
          case 'implements':
            entity.implements = this.parseListProperty(value);
            break;
        }
        return;
      }

      // Shortform imports: <- [Database, UserModel]
      if ((match = line.match(/^<-\s*\[([^\]]+)\]/))) {
        if (!entity.imports) entity.imports = [];
        entity.imports = this.parseList(match[1]);
        return;
      }

      // Shortform exports: -> [createUser, getUser]
      if ((match = line.match(/^->\s*\[([^\]]+)\]/))) {
        if (!entity.exports) entity.exports = [];
        entity.exports = this.parseList(match[1]);
        return;
      }

      // Shortform method calls: ~> [validateUser, saveToDatabase]
      if ((match = line.match(/^~>\s*\[([^\]]+)\]/))) {
        if (!entity.calls) entity.calls = [];
        entity.calls = this.parseList(match[1]);
        return;
      }

      // Shortform affects: ~ [TodoList, TodoItem]
      if ((match = line.match(/^~\s*\[([^\]]+)\]/))) {
        if (!entity.affects) entity.affects = [];
        entity.affects = this.parseList(match[1]);
        return;
      }

      // Shortform UI contains: > [Header, Footer]
      if ((match = line.match(/^>\s*\[([^\]]+)\]/))) {
        if (!entity.contains) entity.contains = [];
        entity.contains = this.parseList(match[1]);
        return;
      }

      // Shortform UI contained by: < [App]
      if ((match = line.match(/^<\s*\[([^\]]+)\]/))) {
        if (!entity.containedBy) entity.containedBy = [];
        entity.containedBy = this.parseList(match[1]);
        return;
      }

      // Shortform class methods: => [create, findAll, update]
      if ((match = line.match(/^=>\s*\[([^\]]+)\]/))) {
        if (!entity.methods) entity.methods = [];
        entity.methods = this.parseList(match[1]);
        return;
      }

      // DTO Fields: - fieldName: type "description" (optional)
      if ((match = line.match(CONTINUATION_PATTERNS.DTO_FIELD))) {
        if (!entity.fields) entity.fields = [];
        const field = {
          name: match[1],
          type: match[2]?.trim(),
          description: match[3],
          optional: match[4]?.includes('optional') || false
        };
        entity.fields.push(field);
        return;
      }

      // Longform field definitions in arrays
      if ((match = line.match(/^\s*\{\s*name:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"(?:\s*,\s*description:\s*"([^"]+)")?(?:\s*,\s*optional:\s*(true|false))?\s*\}/))) {
        if (!entity.fields) entity.fields = [];
        const field = {
          name: match[1],
          type: match[2],
          description: match[3],
          optional: match[4] === 'true'
        };
        entity.fields.push(field);
        return;
      }

      // Description as standalone quoted string
      if ((match = line.match(CONTINUATION_PATTERNS.DESCRIPTION))) {
        entity.description = match[1];
        return;
      }
    }

    parseList(listStr) {
      return listStr.split(',').map(item => item.trim());
    }

    parseListProperty(value) {
      // Handle array syntax like [item1, item2, item3]
      const arrayMatch = value.match(/^\[([^\]]*)\]$/);
      if (arrayMatch) {
        const content = arrayMatch[1].trim();
        if (!content) return []; // Empty array
        return this.parseList(content);
      }
      
      // Handle single value (remove quotes if present)
      return [value.replace(/['"]/g, '')];
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

    validateOrphanedEntities() {
      const entityNames = Array.from(this.entities.keys());
      const referencedEntities = new Set();
      
      // Collect all entity references from various contexts
      for (const entity of this.entities.values()) {
        // Check program entry points
        if (entity.entry) {
          referencedEntities.add(entity.entry);
        }
        
        // Check imports/exports
        if (entity.imports) {
          entity.imports.forEach(imp => referencedEntities.add(imp));
        }
        if (entity.exports) {
          entity.exports.forEach(exp => referencedEntities.add(exp));
        }
        
        // Check function calls
        if (entity.calls) {
          entity.calls.forEach(call => {
            // Handle dotted notation like OrderService.getOrdersByUser
            const baseName = call.split('.')[0];
            referencedEntities.add(baseName);
          });
        }
        
        // Check affects relationships
        if (entity.affects) {
          entity.affects.forEach(affected => referencedEntities.add(affected));
        }
        
        // Check class inheritance
        if (entity.extends) {
          referencedEntities.add(entity.extends);
        }
        if (entity.implements) {
          entity.implements.forEach(impl => referencedEntities.add(impl));
        }
        
        // Check UI component relationships
        if (entity.contains) {
          entity.contains.forEach(child => referencedEntities.add(child));
        }
        if (entity.containedBy) {
          entity.containedBy.forEach(parent => referencedEntities.add(parent));
        }
        
        // Check field types in DTOs
        if (entity.fields) {
          entity.fields.forEach(field => {
            // Extract type name, handle arrays like User[] -> User
            const typeName = field.type?.replace(/\[\]$/, '');
            if (typeName && entityNames.includes(typeName)) {
              referencedEntities.add(typeName);
            }
          });
        }
      }
      
      // Find orphaned entities (defined but never referenced)
      for (const entityName of entityNames) {
        const entity = this.entities.get(entityName);
        
        // Skip program entities as they are typically root entities
        if (entity.type === 'Program') continue;
        
        if (!referencedEntities.has(entityName)) {
          this.errors.push({
            line: entity.position.line,
            column: entity.position.column,
            message: `Orphaned entity '${entityName}' is defined but never referenced`,
            severity: 'warning'
          });
        }
      }
    }
  }

  // Export to global scope
  global.TypedMindParser = TypedMindParser;

})(this);