import type { AnyEntity, ClassEntity, FunctionEntity, UIComponentEntity, AssetEntity, ValidationError, ValidationResult } from './types';

export class DSLValidator {
  private errors: ValidationError[] = [];

  validate(entities: Map<string, AnyEntity>): ValidationResult {
    this.errors = [];

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
    this.checkUIComponentRelationships(entities);
    this.checkFunctionUIComponentAffects(entities);
    this.checkAssetProgramRelationships(entities);
    this.checkUIComponentContainment(entities);

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
    };
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
    }

    // Check for orphans
    for (const [name, entity] of entities) {
      if (!referenced.has(name) && entity.type !== 'Program') {
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
    const programs = Array.from(entities.values()).filter((e) => e.type === 'Program');

    if (programs.length === 0) {
      this.addError({
        position: { line: 1, column: 1 },
        message: 'No program entry point defined',
        severity: 'error',
        suggestion: 'Add a Program entity: AppName -> EntryFile',
      });
    }
    // Multiple programs are now allowed
  }

  private checkUniquePaths(entities: Map<string, AnyEntity>): void {
    const paths = new Map<string, AnyEntity>();

    for (const entity of entities.values()) {
      if ('path' in entity && entity.path) {
        const existing = paths.get(entity.path);
        if (existing) {
          this.addError({
            position: entity.position,
            message: `Duplicate path '${entity.path}'`,
            severity: 'error',
            suggestion: `Already used by '${existing.name}'`,
          });
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
    for (const [name, entity] of entities) {
      if (entity.type === 'Class' && !exportedEntities.has(name)) {
        this.addError({
          position: entity.position,
          message: `Class '${name}' is not exported by any file`,
          severity: 'error',
          suggestion: `Add '${name}' to the exports of a file entity`,
        });
      } else if (entity.type === 'Function' && !exportedEntities.has(name) && !classMethods.has(name)) {
        this.addError({
          position: entity.position,
          message: `Function '${name}' is not exported by any file and is not a class method`,
          severity: 'error',
          suggestion: `Either add '${name}' to the exports of a file entity or define it as a method of a class`,
        });
      }
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
            } else if (targetEntity.type !== 'Class') {
              this.addError({
                position: entity.position,
                message: `Cannot call method '${methodName}' on ${targetEntity.type} '${objectName}'. Only Classes can have methods`,
                severity: 'error',
                suggestion: `Either define '${objectName}' as a Class or use a different call syntax`,
              });
            } else {
              // Check if the method exists on the class
              const classEntity = targetEntity as ClassEntity;
              if (!classEntity.methods.includes(methodName as string)) {
                this.addError({
                  position: entity.position,
                  message: `Method '${methodName}' not found on class '${objectName}'`,
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
}