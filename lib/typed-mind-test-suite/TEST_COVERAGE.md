# TypedMind Test Suite Coverage

This document provides an overview of all test scenarios and what they validate.

## Core Language Features

### Entity Declaration & Validation
- **scenario-01-duplicate-export**: Tests that entities cannot be exported by multiple files
- **scenario-02-orphaned-entity**: Tests that all entities must be referenced (imported/exported/used)
- **scenario-09-no-program**: Tests that at least one Program entity must be defined
- **scenario-12-valid-complete**: Tests a complete valid DSL example with all entity types

### File System
- **scenario-07-duplicate-paths**: Tests that file paths must be unique
- **scenario-08-multiple-programs**: Tests multiple Program entities in a single file (old test)
- **scenario-17-multiple-programs**: Tests multiple Program entities with UI components

### Dependencies & References
- **scenario-03-circular-dependency**: Tests circular dependency detection
- **scenario-04-undefined-imports**: Tests that all imports must reference existing entities
- **scenario-05-undefined-exports**: Tests that all exports must reference existing entities
- **scenario-11-class-export-validation**: Tests class export validation rules

### Function Features
- **scenario-06-invalid-method-calls**: Tests that method calls must reference valid class methods
- **scenario-15-function-affects-ui**: Tests Function affects UIComponent relationships

### Data Transfer Objects (DTOs)
- **scenario-10-dto-validation**: Tests DTO validation including field definitions and usage

### Assets
- **scenario-13-asset-validation**: Tests Asset entity validation and description requirements
- **scenario-18-file-exports-ui-assets**: Tests that Files can export Assets and UIComponents

### UI Components
- **scenario-14-uicomponent-validation**: Tests UIComponent basic validation
- **scenario-16-complete-ui-example**: Tests complete UI example with all component relationships
- **scenario-19-uicomponent-containment**: Tests UIComponent containment hierarchy validation

### Import System
- **scenario-20-basic-import**: Tests basic import functionality
- **scenario-21-aliased-import**: Tests import with alias syntax
- **scenario-22-nested-import**: Tests nested imports (imports that import other files)
- **scenario-23-circular-import**: Tests circular import detection
- **scenario-24-import-not-found**: Tests error handling for missing import files
- **scenario-25-import-duplicate-names**: Tests handling of duplicate entity names from imports

### Runtime Parameters
- **scenario-26-runparameter-basic**: Tests RunParameter entity declaration and consumption
- **scenario-27-runparameter-orphaned**: Tests orphaned RunParameter detection
- **scenario-28-runparameter-invalid-consumes**: Tests invalid RunParameter consumption validation

### Reference System
- **scenario-29-referencedby-tracking**: Tests the referencedBy tracking system
- **scenario-30-invalid-reference-types**: Tests type-safe reference validation

## Test Structure

Each test file:
1. Has a corresponding `.tmd` scenario file in `scenarios/`
2. Tests both parsing and validation
3. Uses snapshot testing for consistent validation
4. Has descriptive error messages with suggestions

## Coverage Summary

The test suite covers:
- ✅ All entity types (Program, File, Function, Class, Constants, DTO, Asset, UIComponent, RunParameter)
- ✅ All relationship types (imports, exports, calls, extends, implements, contains, affects, consumes)
- ✅ Import system with aliasing and circular detection
- ✅ Validation rules and error reporting
- ✅ Reference tracking and type safety
- ✅ Edge cases and error scenarios

The tests are well-organized, with each scenario focusing on a specific aspect of the language, making it easy to understand failures and add new test cases.