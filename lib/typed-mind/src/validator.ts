import type { AnyEntity, ClassEntity, FunctionEntity, UIComponentEntity, AssetEntity, RunParameterEntity, ConstantsEntity, DependencyEntity, DTOEntity, ProgramEntity, ValidationError, ValidationResult, EntityType, ReferenceType } from './types';
import type { ParseResult } from './parser';

export class DSLValidator {
  private errors: ValidationError[] = [];

  // Define which entity types can be referenced by which reference types
  private static readonly VALID_REFERENCES: Record<ReferenceType, { from: EntityType[], to: EntityType[] }> = {
    imports: { 
      from: ['File', 'Class', 'ClassFile'], 
      to: ['Function', 'Class', 'ClassFile', 'Constants', 'DTO', 'Asset', 'UIComponent', 'RunParameter', 'File', 'Dependency'] 
    },
    exports: { 
      from: ['File', 'ClassFile'], 
      to: ['Function', 'Class', 'ClassFile', 'Constants', 'DTO', 'Asset', 'UIComponent', 'File'] 
    },
    calls: { 
      from: ['Function'], 
      to: ['Function', 'Class'] // Class is allowed because of method calls
    },
    extends: { 
      from: ['Class', 'ClassFile'], 
      to: ['Class', 'ClassFile'] 
    },
    implements: { 
      from: ['Class', 'ClassFile'], 
      to: ['Class', 'ClassFile'] // In TypedMind, interfaces are represented as Classes
    },
    contains: { 
      from: ['UIComponent'], 
      to: ['UIComponent'] 
    },
    containedBy: { 
      from: ['UIComponent'], 
      to: ['UIComponent'] 
    },
    affects: { 
      from: ['Function'], 
      to: ['UIComponent'] 
    },
    affectedBy: { 
      from: ['UIComponent'], 
      to: ['Function'] 
    },
    consumes: { 
      from: ['Function'], 
      to: ['RunParameter'] 
    },
    consumedBy: { 
      from: ['RunParameter'], 
      to: ['Function'] 
    },
    input: { 
      from: ['Function'], 
      to: ['DTO'] 
    },
    output: { 
      from: ['Function'], 
      to: ['DTO'] 
    },
    entry: { 
      from: ['Program'], 
      to: ['File'] 
    },
    containsProgram: { 
      from: ['Asset'], 
      to: ['Program'] 
    },
    schema: { 
      from: ['Constants'], 
      to: ['Class', 'DTO'] // Schema can reference a type definition
    }
  };

  validate(entities: Map<string, AnyEntity>, parseResult?: ParseResult): ValidationResult {
    this.errors = [];

    // First populate referencedBy fields
    this.populateReferencedBy(entities);

    // Check naming conflicts from parser
    if (parseResult?.namingConflicts) {
      this.processNamingConflicts(parseResult.namingConflicts);
    }
    
    this.checkNamingConflicts(entities);
    this.checkOrphans(entities);
    this.checkImports(entities);
    this.checkCircularDeps(entities);
    this.checkEntryPoint(entities);
    this.checkUniquePaths(entities);
    this.checkClassAndFunctionExports(entities);
    this.checkDuplicateExports(entities);
    this.checkMethodCalls(entities);
    this.checkUndefinedExports(entities);
    this.checkFunctionDTOs(entities);
    this.checkDTOFieldTypes(entities);
    this.checkUIComponentRelationships(entities);
    this.checkFunctionUIComponentAffects(entities);
    this.checkAssetProgramRelationships(entities);
    this.checkUIComponentContainment(entities);
    this.checkRunParameterConsumption(entities);

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
    };
  }

  private processNamingConflicts(namingConflicts: Array<{name: string; existingEntity: AnyEntity; newEntity: AnyEntity}>): void {
    for (const conflict of namingConflicts) {
      const { name, existingEntity, newEntity } = conflict;
      
      // Check if this is a Class-File conflict specifically
      if ((existingEntity.type === 'Class' && newEntity.type === 'File') ||
          (existingEntity.type === 'File' && newEntity.type === 'Class')) {
        
        const fileEntity = existingEntity.type === 'File' ? existingEntity : newEntity;
        const classEntity = existingEntity.type === 'Class' ? existingEntity : newEntity;
        
        // Add error for both entities
        this.addError({
          position: classEntity.position,
          message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
          severity: 'error',
          suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`,
        });
        
        this.addError({
          position: fileEntity.position,
          message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
          severity: 'error',
          suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`,
        });
      } else {
        // Other naming conflicts
        this.addError({
          position: newEntity.position,
          message: `Duplicate entity name '${name}' found in multiple ${existingEntity.type}, ${newEntity.type} entities`,
          severity: 'error',
          suggestion: 'Entity names must be unique across the entire codebase',
        });
      }
    }
  }

  private checkNamingConflicts(entities: Map<string, AnyEntity>): void {
    // Group entities by name to detect naming conflicts
    const nameGroups = new Map<string, AnyEntity[]>();
    
    for (const entity of entities.values()) {
      const name = entity.name;
      if (!nameGroups.has(name)) {
        nameGroups.set(name, []);
      }
      nameGroups.get(name)!.push(entity);
    }
    
    // Check for Class-File naming conflicts
    for (const [name, entitiesWithSameName] of nameGroups) {
      if (entitiesWithSameName.length > 1) {
        const hasClass = entitiesWithSameName.some(e => e.type === 'Class');
        const hasFile = entitiesWithSameName.some(e => e.type === 'File');
        
        if (hasClass && hasFile) {
          // Find the class and file entities
          const classEntity = entitiesWithSameName.find(e => e.type === 'Class');
          const fileEntity = entitiesWithSameName.find(e => e.type === 'File');
          
          if (classEntity && fileEntity) {
            this.addError({
              position: classEntity.position,
              message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
              severity: 'error',
              suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`,
            });
            
            this.addError({
              position: fileEntity.position,
              message: `Entity name '${name}' is used by both a File and a Class. Consider using the #: operator for class-file fusion.`,
              severity: 'error',
              suggestion: `Replace with: ${name} #: ${fileEntity.path} <: BaseClass`,
            });
          }
        } else {
          // Other naming conflicts (not Class-File specific)
          const [first] = entitiesWithSameName;
          if (first) {
            this.addError({
              position: first.position,
              message: `Duplicate entity name '${name}' found in multiple ${entitiesWithSameName.map(e => e.type).join(', ')} entities`,
              severity: 'error',
              suggestion: 'Entity names must be unique across the entire codebase',
            });
          }
        }
      }
    }
  }

  private checkOrphans(entities: Map<string, AnyEntity>): void {
    const referenced = new Set<string>();

    // Find all referenced entities
    for (const entity of entities.values()) {
      if ('imports' in entity) {
        for (const imp of entity.imports) {
          if (!imp.includes('*')) {
            referenced.add(imp);
          }
        }
      }
      if ('exports' in entity) {
        for (const exp of entity.exports) {
          referenced.add(exp);
        }
      }
      if ('calls' in entity) {
        for (const call of entity.calls) {
          referenced.add(call);
        }
      }
      if ('methods' in entity) {
        for (const method of entity.methods) {
          referenced.add(method);
        }
      }
      if (entity.type === 'Program') {
        referenced.add(entity.entry);
      }
      if ('consumes' in entity) {
        for (const param of entity.consumes) {
          referenced.add(param);
        }
      }
      // Track Function input/output DTOs
      if (entity.type === 'Function') {
        const funcEntity = entity as FunctionEntity;
        if (funcEntity.input) {
          referenced.add(funcEntity.input);
        }
        if (funcEntity.output) {
          referenced.add(funcEntity.output);
        }
      }
      // Track UIComponent contains
      if (entity.type === 'UIComponent') {
        const uiEntity = entity as UIComponentEntity;
        if (uiEntity.contains) {
          for (const child of uiEntity.contains) {
            referenced.add(child);
          }
        }
      }
      // Track Asset contains program
      if (entity.type === 'Asset') {
        const assetEntity = entity as AssetEntity;
        if (assetEntity.containsProgram) {
          referenced.add(assetEntity.containsProgram);
        }
      }
    }

    // Check for orphans
    for (const [name, entity] of entities) {
      if (!referenced.has(name) && entity.type !== 'Program' && entity.type !== 'Dependency') {
        this.addError({
          position: entity.position,
          message: `Orphaned entity '${name}'`,
          severity: 'error',
          suggestion: 'Remove or reference this entity',
        });
      }
    }
  }

  private checkImports(entities: Map<string, AnyEntity>): void {
    for (const entity of entities.values()) {
      if (!('imports' in entity)) continue;

      for (const imp of entity.imports) {
        // Handle wildcards
        if (imp.includes('*')) {
          const base = imp.split('*')[0] as string;
          const hasMatch = Array.from(entities.keys()).some((name) => name.startsWith(base));

          if (!hasMatch) {
            this.addError({
              position: entity.position,
              message: `No entities match import pattern '${imp}'`,
              severity: 'error',
            });
          }
        } else if (!entities.has(imp)) {
          // Check if it's a Dependency entity
          const isDependency = Array.from(entities.values()).some(
            e => e.type === 'Dependency' && e.name === imp
          );
          
          if (!isDependency) {
            // Fuzzy match for suggestions
            const suggestion = this.findSimilar(imp, entities);
            const error: ValidationError = {
              position: entity.position,
              message: `Import '${imp}' not found`,
              severity: 'error',
            };
            if (suggestion) {
              error.suggestion = `Did you mean '${suggestion}'?`;
            }
            this.addError(error);
          }
        }
      }
    }
  }

  private checkCircularDeps(entities: Map<string, AnyEntity>): void {
    const graph = this.buildDependencyGraph(entities);
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (node: string, path: string[] = []): string[] | null => {
      visited.add(node);
      recursionStack.add(node);
      path.push(node);

      const deps = graph.get(node) || [];
      for (const dep of deps) {
        if (!visited.has(dep)) {
          const cycle = hasCycle(dep, [...path]);
          if (cycle) return cycle;
        } else if (recursionStack.has(dep)) {
          return [...path, dep];
        }
      }

      recursionStack.delete(node);
      return null;
    };

    for (const name of entities.keys()) {
      if (!visited.has(name)) {
        const cycle = hasCycle(name);
        if (cycle) {
          const entity = entities.get(name);
          if (entity) {
            this.addError({
              position: entity.position,
              message: `Circular dependency detected: ${cycle.join(' -> ')}`,
              severity: 'error',
            });
          }
        }
      }
    }
  }

  private checkEntryPoint(entities: Map<string, AnyEntity>): void {
    const programs = Array.from(entities.values()).filter((e) => e.type === 'Program') as ProgramEntity[];

    if (programs.length === 0) {
      this.addError({
        position: { line: 1, column: 1 },
        message: 'No program entry point defined',
        severity: 'error',
        suggestion: 'Add a Program entity: AppName -> EntryFile',
      });
    }

    // Check that each Program's entry point references an existing File entity
    for (const program of programs) {
      const entryFile = entities.get(program.entry);
      if (!entryFile) {
        this.addError({
          position: program.position,
          message: `Program '${program.name}' references undefined entry point '${program.entry}'`,
          severity: 'error',
          suggestion: `Define a File entity: ${program.entry} @ path/to/file.ext:`,
        });
      } else if (entryFile.type !== 'File') {
        this.addError({
          position: program.position,
          message: `Program '${program.name}' entry point '${program.entry}' must be a File entity, but found ${entryFile.type}`,
          severity: 'error',
          suggestion: `Change '${program.entry}' to a File entity: ${program.entry} @ path/to/file.ext:`,
        });
      }
    }
  }

  private checkUniquePaths(entities: Map<string, AnyEntity>): void {
    const paths = new Map<string, AnyEntity>();

    for (const entity of entities.values()) {
      if ('path' in entity && entity.path) {
        const existing = paths.get(entity.path);
        if (existing) {
          // Allow ClassFile entities to have the same path as their component entities would
          const isClassFileConflict = (entity.type === 'ClassFile' || existing.type === 'ClassFile') &&
            (entity.type === 'File' || entity.type === 'Class' || existing.type === 'File' || existing.type === 'Class');
          
          if (!isClassFileConflict) {
            this.addError({
              position: entity.position,
              message: `Duplicate path '${entity.path}'`,
              severity: 'error',
              suggestion: `Already used by '${existing.name}'`,
            });
          }
        } else {
          paths.set(entity.path, entity);
        }
      }
    }
  }

  private buildDependencyGraph(entities: Map<string, AnyEntity>): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const [name, entity] of entities) {
      const deps: string[] = [];

      if ('imports' in entity) {
        deps.push(...entity.imports.filter((imp) => !imp.includes('*')));
      }
      if ('calls' in entity) {
        deps.push(...entity.calls);
      }
      if (entity.type === 'Program') {
        deps.push(entity.entry);
      }

      graph.set(name, deps);
    }

    return graph;
  }

  private findSimilar(target: string, entities: Map<string, AnyEntity>): string | null {
    let bestMatch = '';
    let bestScore = 0.6; // Threshold

    for (const name of entities.keys()) {
      const score = this.similarity(target.toLowerCase(), name.toLowerCase());
      if (score > bestScore) {
        bestScore = score;
        bestMatch = name;
      }
    }

    return bestMatch || null;
  }

  private similarity(a: string, b: string): number {
    if (a === b) return 1;
    if (a.length === 0 || b.length === 0) return 0;

    // Create and initialize matrix
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= a.length; j++) {
        if (i === 0) {
          matrix[i][j] = j;
        } else if (j === 0) {
          matrix[i][j] = i;
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    // Fill the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    const distance = matrix[b.length][a.length];
    return 1 - distance / Math.max(a.length, b.length);
  }

  private addError(error: ValidationError): void {
    this.errors.push(error);
  }

  private checkClassAndFunctionExports(entities: Map<string, AnyEntity>): void {
    // Build a set of all exported entities
    const exportedEntities = new Set<string>();
    
    // Build a set of all class methods
    const classMethods = new Set<string>();
    
    for (const entity of entities.values()) {
      if ('exports' in entity && entity.exports) {
        for (const exp of entity.exports) {
          exportedEntities.add(exp);
        }
      }
      if ('methods' in entity && entity.methods) {
        for (const method of entity.methods) {
          classMethods.add(method);
        }
      }
    }

    // Check that all classes and standalone functions are exported by at least one file
    // Note: Methods of classes don't need to be exported separately
    // Note: ClassFile entities automatically export themselves
    for (const [name, entity] of entities) {
      if (entity.type === 'Class' && !exportedEntities.has(name)) {
        this.addError({
          position: entity.position,
          message: `Class '${name}' is not exported by any file`,
          severity: 'error',
          suggestion: `Add '${name}' to the exports of a file entity or convert to ClassFile with #: operator`,
        });
      } else if (entity.type === 'Function' && !exportedEntities.has(name) && !classMethods.has(name)) {
        this.addError({
          position: entity.position,
          message: `Function '${name}' is not exported by any file and is not a class method`,
          severity: 'error',
          suggestion: `Either add '${name}' to the exports of a file entity or define it as a method of a class`,
        });
      }
      // ClassFile entities are automatically exported, so no check needed
    }
  }

  private checkDuplicateExports(entities: Map<string, AnyEntity>): void {
    const exportMap = new Map<string, AnyEntity[]>();
    
    // Build map of which files export each entity
    for (const entity of entities.values()) {
      if ('exports' in entity && entity.exports) {
        for (const exp of entity.exports) {
          if (!exportMap.has(exp)) {
            exportMap.set(exp, []);
          }
          exportMap.get(exp)!.push(entity);
        }
      }
    }
    
    // Check if any entity is exported by multiple files
    for (const [exportName, exporters] of exportMap) {
      if (exporters.length > 1) {
        // Check if this exported name is an entity (exists in entities map)
        const isEntity = entities.has(exportName);
        
        // Only report error once for the first duplicate we find
        const [first] = exporters;
        if (isEntity && first) {
          this.addError({
            position: first.position,
            message: `Entity '${exportName}' is exported by multiple files: ${exporters.map(e => e.name).join(', ')}`,
            severity: 'error',
            suggestion: 'Each entity should be exported by exactly one file. Remove the duplicate exports.',
          });
        }
      }
    }
  }

  private checkMethodCalls(entities: Map<string, AnyEntity>): void {
    // Check function calls for validity
    for (const entity of entities.values()) {
      if ('calls' in entity && entity.calls) {
        for (const call of entity.calls) {
          // Check for method call syntax (e.g., TodoModel.create)
          if (call.includes('.')) {
            const [objectName, methodName] = call.split('.', 2);
            const targetEntity = entities.get(objectName as string);
            
            if (!targetEntity) {
              this.addError({
                position: entity.position,
                message: `Call to '${call}' references unknown entity '${objectName}'`,
                severity: 'error',
              });
            } else if (targetEntity.type !== 'Class' && targetEntity.type !== 'ClassFile') {
              this.addError({
                position: entity.position,
                message: `Cannot call method '${methodName}' on ${targetEntity.type} '${objectName}'. Only Classes and ClassFiles can have methods`,
                severity: 'error',
                suggestion: `Either define '${objectName}' as a Class/ClassFile or use a different call syntax`,
              });
            } else {
              // Check if the method exists on the class/classfile
              const classEntity = targetEntity as ClassEntity;
              if (!classEntity.methods.includes(methodName as string)) {
                this.addError({
                  position: entity.position,
                  message: `Method '${methodName}' not found on ${targetEntity.type.toLowerCase()} '${objectName}'`,
                  severity: 'error',
                  suggestion: `Available methods: ${classEntity.methods.join(', ')}`,
                });
              }
            }
          }
        }
      }
    }
  }

  private checkUndefinedExports(entities: Map<string, AnyEntity>): void {
    // Check that all exported names have corresponding entity definitions
    for (const entity of entities.values()) {
      if ('exports' in entity && entity.exports) {
        for (const exportName of entity.exports) {
          if (!entities.has(exportName)) {
            this.addError({
              position: entity.position,
              message: `Export '${exportName}' is not defined anywhere in the codebase`,
              severity: 'error',
              suggestion: `Define '${exportName}' as a Function, Class, Constants, Asset, or UIComponent entity`,
            });
          }
        }
      }
    }
  }

  private checkFunctionDTOs(entities: Map<string, AnyEntity>): void {
    // Check that function input/output DTOs exist
    for (const entity of entities.values()) {
      if (entity.type === 'Function') {
        const funcEntity = entity as FunctionEntity;
        
        if (funcEntity.input) {
          const inputEntity = entities.get(funcEntity.input);
          if (!inputEntity) {
            this.addError({
              position: entity.position,
              message: `Function input DTO '${funcEntity.input}' not found`,
              severity: 'error',
              suggestion: `Define '${funcEntity.input}' as a DTO entity`,
            });
          } else if (inputEntity.type !== 'DTO') {
            this.addError({
              position: entity.position,
              message: `Function input '${funcEntity.input}' is not a DTO (it's a ${inputEntity.type})`,
              severity: 'error',
              suggestion: `Change '${funcEntity.input}' to a DTO or use a different input type`,
            });
          }
        }

        if (funcEntity.output) {
          const outputEntity = entities.get(funcEntity.output);
          if (!outputEntity) {
            this.addError({
              position: entity.position,
              message: `Function output DTO '${funcEntity.output}' not found`,
              severity: 'error',
              suggestion: `Define '${funcEntity.output}' as a DTO entity`,
            });
          } else if (outputEntity.type !== 'DTO') {
            this.addError({
              position: entity.position,
              message: `Function output '${funcEntity.output}' is not a DTO (it's a ${outputEntity.type})`,
              severity: 'error',
              suggestion: `Change '${funcEntity.output}' to a DTO or use a different output type`,
            });
          }
        }
      }
    }
  }


  private checkUIComponentRelationships(entities: Map<string, AnyEntity>): void {
    for (const entity of entities.values()) {
      if (entity.type === 'UIComponent') {
        const uiEntity = entity as UIComponentEntity;
        
        // Check contains references
        if (uiEntity.contains) {
          for (const childName of uiEntity.contains) {
            const childEntity = entities.get(childName);
            if (!childEntity) {
              this.addError({
                position: entity.position,
                message: `UIComponent '${entity.name}' contains unknown component '${childName}'`,
                severity: 'error',
                suggestion: `Define '${childName}' as a UIComponent`,
              });
            } else if (childEntity.type !== 'UIComponent') {
              this.addError({
                position: entity.position,
                message: `UIComponent '${entity.name}' cannot contain '${childName}' (it's a ${childEntity.type})`,
                severity: 'error',
                suggestion: `Only UIComponents can contain other UIComponents`,
              });
            }
          }
        }
        
        // Check containedBy references
        if (uiEntity.containedBy) {
          for (const parentName of uiEntity.containedBy) {
            const parentEntity = entities.get(parentName);
            if (!parentEntity) {
              this.addError({
                position: entity.position,
                message: `UIComponent '${entity.name}' references unknown parent '${parentName}'`,
                severity: 'error',
                suggestion: `Define '${parentName}' as a UIComponent`,
              });
            } else if (parentEntity.type !== 'UIComponent') {
              this.addError({
                position: entity.position,
                message: `UIComponent '${entity.name}' cannot be contained by '${parentName}' (it's a ${parentEntity.type})`,
                severity: 'error',
                suggestion: `Only UIComponents can contain other UIComponents`,
              });
            }
          }
        }
      }
    }
  }

  private checkFunctionUIComponentAffects(entities: Map<string, AnyEntity>): void {
    // Build bi-directional validation
    const componentAffectedBy = new Map<string, string[]>();
    
    for (const entity of entities.values()) {
      if (entity.type === 'Function') {
        const funcEntity = entity as FunctionEntity;
        if (funcEntity.affects) {
          for (const componentName of funcEntity.affects) {
            const componentEntity = entities.get(componentName);
            if (!componentEntity) {
              this.addError({
                position: entity.position,
                message: `Function '${entity.name}' affects unknown component '${componentName}'`,
                severity: 'error',
                suggestion: `Define '${componentName}' as a UIComponent`,
              });
            } else if (componentEntity.type !== 'UIComponent') {
              this.addError({
                position: entity.position,
                message: `Function '${entity.name}' cannot affect '${componentName}' (it's a ${componentEntity.type})`,
                severity: 'error',
                suggestion: `Functions can only affect UIComponents`,
              });
            } else {
              // Track for bi-directional validation
              if (!componentAffectedBy.has(componentName)) {
                componentAffectedBy.set(componentName, []);
              }
              componentAffectedBy.get(componentName)!.push(entity.name);
            }
          }
        }
      }
    }
    
    // Check that UIComponent.affectedBy matches Function.affects
    for (const entity of entities.values()) {
      if (entity.type === 'UIComponent') {
        const uiEntity = entity as UIComponentEntity;
        const functionsAffecting = componentAffectedBy.get(entity.name) || [];
        
        if (uiEntity.affectedBy && uiEntity.affectedBy.length > 0) {
          // Component claims to be affected by functions - verify they match
          for (const funcName of uiEntity.affectedBy) {
            if (!functionsAffecting.includes(funcName)) {
              this.addError({
                position: entity.position,
                message: `UIComponent '${entity.name}' claims to be affected by '${funcName}', but that function doesn't affect it`,
                severity: 'error',
                suggestion: `Add '${entity.name}' to the affects list of function '${funcName}'`,
              });
            }
          }
        }
      }
    }
  }

  private checkAssetProgramRelationships(entities: Map<string, AnyEntity>): void {
    for (const entity of entities.values()) {
      if (entity.type === 'Asset') {
        const assetEntity = entity as AssetEntity;
        
        if (assetEntity.containsProgram) {
          const programEntity = entities.get(assetEntity.containsProgram);
          
          if (!programEntity) {
            this.addError({
              position: entity.position,
              message: `Asset '${entity.name}' references unknown program '${assetEntity.containsProgram}'`,
              severity: 'error',
              suggestion: `Define '${assetEntity.containsProgram}' as a Program entity`,
            });
          } else if (programEntity.type !== 'Program') {
            this.addError({
              position: entity.position,
              message: `Asset '${entity.name}' cannot contain '${assetEntity.containsProgram}' (it's a ${programEntity.type})`,
              severity: 'error',
              suggestion: `Assets can only contain Program entities`,
            });
          }
        }
      }
    }
  }

  private checkUIComponentContainment(entities: Map<string, AnyEntity>): void {
    // Build a set of all UIComponents that are contained by other UIComponents
    const containedComponents = new Set<string>();
    
    for (const entity of entities.values()) {
      if (entity.type === 'UIComponent') {
        const uiEntity = entity as UIComponentEntity;
        if (uiEntity.contains) {
          for (const childName of uiEntity.contains) {
            containedComponents.add(childName);
          }
        }
      }
    }
    
    // Check that all non-root UIComponents are contained by another component
    for (const entity of entities.values()) {
      if (entity.type === 'UIComponent') {
        const uiEntity = entity as UIComponentEntity;
        
        // Skip root components - they don't need to be contained
        if (uiEntity.root) {
          continue;
        }
        
        // Check if this non-root component is contained by any other component
        if (!containedComponents.has(entity.name)) {
          this.addError({
            position: entity.position,
            message: `UIComponent '${entity.name}' is not contained by any other UIComponent`,
            severity: 'error',
            suggestion: `Either add '${entity.name}' to another UIComponent's contains list, or mark it as a root component with &!`,
          });
        }
      }
    }
  }

  private checkRunParameterConsumption(entities: Map<string, AnyEntity>): void {
    // Check that Functions' consumes references exist and are RunParameters
    for (const entity of entities.values()) {
      if (entity.type === 'Function') {
        const funcEntity = entity as FunctionEntity;
        
        if (funcEntity.consumes) {
          for (const paramName of funcEntity.consumes) {
            const paramEntity = entities.get(paramName);
            
            if (!paramEntity) {
              this.addError({
                position: entity.position,
                message: `Function '${entity.name}' consumes unknown parameter '${paramName}'`,
                severity: 'error',
                suggestion: `Define '${paramName}' as a RunParameter`,
              });
            } else if (paramEntity.type !== 'RunParameter') {
              this.addError({
                position: entity.position,
                message: `Function '${entity.name}' cannot consume '${paramName}' (it's a ${paramEntity.type})`,
                severity: 'error',
                suggestion: `Functions can only consume RunParameters`,
              });
            }
          }
        }
      }
    }

    // Check that RunParameters' consumedBy matches Functions' consumes
    for (const entity of entities.values()) {
      if (entity.type === 'RunParameter') {
        const paramEntity = entity as RunParameterEntity;
        
        if (paramEntity.consumedBy && paramEntity.consumedBy.length > 0) {
          for (const funcName of paramEntity.consumedBy) {
            const funcEntity = entities.get(funcName);
            
            if (!funcEntity) {
              this.addError({
                position: entity.position,
                message: `RunParameter '${entity.name}' claims to be consumed by unknown function '${funcName}'`,
                severity: 'error',
              });
            } else if (funcEntity.type !== 'Function') {
              this.addError({
                position: entity.position,
                message: `RunParameter '${entity.name}' claims to be consumed by '${funcName}' which is not a Function`,
                severity: 'error',
              });
            } else {
              const func = funcEntity as FunctionEntity;
              if (!func.consumes || !func.consumes.includes(entity.name)) {
                this.addError({
                  position: entity.position,
                  message: `RunParameter '${entity.name}' claims to be consumed by '${funcName}', but that function doesn't consume it`,
                  severity: 'error',
                  suggestion: `Add '${entity.name}' to the consumes list of function '${funcName}'`,
                });
              }
            }
          }
        }
      }
    }
  }

  private populateReferencedBy(entities: Map<string, AnyEntity>): void {
    // Clear any existing referencedBy arrays
    for (const entity of entities.values()) {
      entity.referencedBy = [];
    }

    // Helper to add a reference with validation
    const addReference = (targetName: string, refType: ReferenceType, from: AnyEntity): void => {
      const target = entities.get(targetName);
      if (!target) return;

      // Validate the reference type is allowed
      const validRef = DSLValidator.VALID_REFERENCES[refType];
      if (!validRef) {
        this.addError({
          position: from.position,
          message: `Unknown reference type '${refType}'`,
          severity: 'error',
        });
        return;
      }

      // Check if the 'from' entity type is allowed to make this reference
      if (!validRef.from.includes(from.type)) {
        this.addError({
          position: from.position,
          message: `${from.type} '${from.name}' cannot have '${refType}' references`,
          severity: 'error',
          suggestion: `Only ${validRef.from.join(', ')} entities can have '${refType}' references`,
        });
        return;
      }

      // Check if the 'to' entity type is allowed to be referenced this way
      if (!validRef.to.includes(target.type)) {
        this.addError({
          position: from.position,
          message: `Cannot use '${refType}' to reference ${target.type} '${targetName}'`,
          severity: 'error',
          suggestion: `'${refType}' can only reference: ${validRef.to.join(', ')}`,
        });
        return;
      }

      // Check if this reference already exists
      const exists = target.referencedBy!.some(
        ref => ref.from === from.name && ref.type === refType
      );
      
      if (!exists) {
        target.referencedBy!.push({
          from: from.name,
          type: refType,
          fromType: from.type
        });
      }
    };

    // Populate referencedBy based on various references
    for (const referencer of entities.values()) {
      // Track imports
      if ('imports' in referencer) {
        for (const imp of referencer.imports) {
          if (!imp.includes('*')) {
            // Check if this is a Dependency entity
            const dependency = Array.from(entities.values()).find(
              e => e.type === 'Dependency' && e.name === imp
            );
            
            if (dependency) {
              // For Dependencies, update their importedBy field directly
              const depEntity = dependency as DependencyEntity;
              if (!depEntity.importedBy) {
                depEntity.importedBy = [];
              }
              if (!depEntity.importedBy.includes(referencer.name)) {
                depEntity.importedBy.push(referencer.name);
              }
            } else {
              // For other entities, use the standard addReference
              addReference(imp, 'imports', referencer);
            }
          }
        }
      }

      // Track exports
      if ('exports' in referencer) {
        for (const exp of referencer.exports) {
          addReference(exp, 'exports', referencer);
        }
      }

      // Track function calls
      if ('calls' in referencer) {
        for (const call of referencer.calls) {
          const callTarget = call.includes('.') ? call.split('.')[0] : call;
          addReference(callTarget, 'calls', referencer);
        }
      }

      // Track Program entry
      if (referencer.type === 'Program') {
        addReference(referencer.entry, 'entry', referencer);
      }

      // Track Function input/output DTOs
      if (referencer.type === 'Function') {
        const func = referencer as FunctionEntity;
        if (func.input) {
          addReference(func.input, 'input', referencer);
        }
        if (func.output) {
          addReference(func.output, 'output', referencer);
        }
      }

      // Track consumes (RunParameters)
      if ('consumes' in referencer) {
        const func = referencer as FunctionEntity;
        if (func.consumes) {
          for (const param of func.consumes) {
            addReference(param, 'consumes', referencer);
          }
        }
      }

      // Track affects (UIComponents)
      if ('affects' in referencer) {
        const func = referencer as FunctionEntity;
        if (func.affects) {
          for (const comp of func.affects) {
            addReference(comp, 'affects', referencer);
          }
        }
      }

      // Track Asset contains program
      if (referencer.type === 'Asset') {
        const asset = referencer as AssetEntity;
        if (asset.containsProgram) {
          addReference(asset.containsProgram, 'containsProgram', referencer);
        }
      }

      // Track UIComponent contains/containedBy
      if (referencer.type === 'UIComponent') {
        const ui = referencer as UIComponentEntity;
        if (ui.contains) {
          for (const child of ui.contains) {
            addReference(child, 'contains', referencer);
          }
        }
        if (ui.containedBy) {
          for (const parent of ui.containedBy) {
            addReference(parent, 'containedBy', referencer);
          }
        }
      }

      // Track Class inheritance
      if (referencer.type === 'Class') {
        const cls = referencer as ClassEntity;
        if (cls.extends) {
          addReference(cls.extends, 'extends', referencer);
        }
        for (const intf of cls.implements) {
          addReference(intf, 'implements', referencer);
        }
      }

      // Track Constants schema
      if (referencer.type === 'Constants') {
        const cnst = referencer as ConstantsEntity;
        if (cnst.schema) {
          addReference(cnst.schema, 'schema', referencer);
        }
      }

      // Track affectedBy reverse references
      if (referencer.type === 'UIComponent') {
        const ui = referencer as UIComponentEntity;
        if (ui.affectedBy) {
          for (const funcName of ui.affectedBy) {
            addReference(funcName, 'affectedBy', referencer);
          }
        }
      }

      // Track consumedBy reverse references
      if (referencer.type === 'RunParameter') {
        const param = referencer as RunParameterEntity;
        if (param.consumedBy) {
          for (const funcName of param.consumedBy) {
            addReference(funcName, 'consumedBy', referencer);
          }
        }
      }
    }
  }

  private checkDTOFieldTypes(entities: Map<string, AnyEntity>): void {
    // Check that DTO fields don't have Function type
    for (const entity of entities.values()) {
      if (entity.type === 'DTO') {
        const dtoEntity = entity as DTOEntity;
        
        if (dtoEntity.fields) {
          for (const field of dtoEntity.fields) {
            // Check if field type is exactly 'Function' or contains 'Function' as a word
            if (field.type && (field.type === 'Function' || /\bFunction\b/.test(field.type))) {
              this.addError({
                position: entity.position,
                message: `DTO '${entity.name}' field '${field.name}' cannot have Function type`,
                severity: 'error',
                suggestion: `DTOs should only contain data fields. Use string, number, boolean, object, array, or other data types instead`,
              });
            }
          }
        }
      }
    }
  }
}