import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  Hover,
  MarkupKind,
  DefinitionParams,
  Location,
  ReferenceParams,
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { DSLParser, DSLValidator } from '@sammons/typed-mind';
import type { AnyEntity } from '@sammons/typed-mind';

export class TypedMindLanguageServer {
  private connection = createConnection(ProposedFeatures.all);
  private documents = new TextDocuments<TextDocument>(TextDocument);
  private parser = new DSLParser();
  private validator = new DSLValidator();
  
  // Cache parsed entities per document
  private documentEntities = new Map<string, Map<string, AnyEntity>>();
  
  constructor() {
    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.connection.onInitialize((_params: InitializeParams): InitializeResult => {
      const result: InitializeResult = {
        capabilities: {
          textDocumentSync: TextDocumentSyncKind.Incremental,
          completionProvider: {
            resolveProvider: false,
            triggerCharacters: ['-', '<', '@', ':', '~', '!', '=', '#'],
          },
          hoverProvider: true,
          definitionProvider: true,
          referencesProvider: true,
        },
      };
      return result;
    });

    this.connection.onInitialized(() => {
      this.connection.console.log('TypedMind Language Server initialized');
    });

    // Handle document open
    this.documents.onDidOpen((event) => {
      this.validateTextDocument(event.document);
    });

    // Handle text document changes
    this.documents.onDidChangeContent((change) => {
      this.validateTextDocument(change.document);
    });

    // Handle completion
    this.connection.onCompletion((params: TextDocumentPositionParams): CompletionItem[] => {
      return this.provideCompletions(params);
    });

    // Handle hover
    this.connection.onHover((params: TextDocumentPositionParams): Hover | null => {
      return this.provideHover(params);
    });

    // Handle go to definition
    this.connection.onDefinition((params: DefinitionParams): Location | null => {
      return this.provideDefinition(params);
    });

    // Handle find references
    this.connection.onReferences((params: ReferenceParams): Location[] => {
      return this.provideReferences(params);
    });
  }

  private async validateTextDocument(textDocument: TextDocument): Promise<void> {
    const text = textDocument.getText();
    const diagnostics: Diagnostic[] = [];

    try {
      // Parse the document
      const entities = this.parser.parse(text);
      this.documentEntities.set(textDocument.uri, entities);

      // Validate the parsed entities
      const validationResult = this.validator.validate(entities);

      // Convert validation errors to diagnostics
      for (const error of validationResult.errors) {
        const diagnostic: Diagnostic = {
          severity: error.severity === 'error' ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning,
          range: {
            start: { line: error.position.line - 1, character: error.position.column - 1 },
            end: { line: error.position.line - 1, character: error.position.column + 10 },
          },
          message: error.message,
          source: 'typed-mind',
        };

        if (error.suggestion) {
          diagnostic.message += `\n${error.suggestion}`;
        }

        diagnostics.push(diagnostic);
      }
    } catch (parseError) {
      // Handle parse errors
      const diagnostic: Diagnostic = {
        severity: DiagnosticSeverity.Error,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 },
        },
        message: `Parse error: ${parseError}`,
        source: 'typed-mind',
      };
      diagnostics.push(diagnostic);
    }

    // Send the diagnostics to VS Code
    await this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }

  private provideCompletions(params: TextDocumentPositionParams): CompletionItem[] {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return [];

    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return [];

    const items: CompletionItem[] = [];

    // Add entity types
    const entityTypes = ['Program', 'File', 'Function', 'Class', 'Constants'] as const;
    for (const type of entityTypes) {
      items.push({
        label: type,
        kind: CompletionItemKind.Keyword,
        detail: `Entity type: ${type}`,
      });
    }

    // Add operators
    const operators = [
      { label: '->', detail: 'Entry point operator' },
      { label: '<-', detail: 'Import operator' },
      { label: '@', detail: 'Location operator' },
      { label: '::', detail: 'Function signature operator' },
      { label: '~>', detail: 'Function calls operator' },
      { label: '<:', detail: 'Extends operator' },
      { label: '!', detail: 'Constants operator' },
      { label: '=>', detail: 'Methods operator' },
    ];

    for (const op of operators) {
      items.push({
        label: op.label,
        kind: CompletionItemKind.Operator,
        detail: op.detail,
      });
    }

    // Add existing entity names for references
    for (const [name, entity] of entities) {
      items.push({
        label: name,
        kind: this.getCompletionItemKind(entity.type),
        detail: `${entity.type}: ${name}`,
      });
    }

    return items;
  }

  private getCompletionItemKind(entityType: string): CompletionItemKind {
    switch (entityType) {
      case 'Program':
        return CompletionItemKind.Module;
      case 'File':
        return CompletionItemKind.File;
      case 'Function':
        return CompletionItemKind.Function;
      case 'Class':
        return CompletionItemKind.Class;
      case 'Constants':
        return CompletionItemKind.Constant;
      default:
        return CompletionItemKind.Variable;
    }
  }

  private provideHover(params: TextDocumentPositionParams): Hover | null {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return null;

    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return null;

    // Find entity at position
    const text = document.getText();
    const offset = document.offsetAt(params.position);
    
    // Simple heuristic: find word at position
    const wordRange = this.getWordRangeAtPosition(text, offset);
    if (!wordRange) return null;

    const word = text.substring(wordRange.start, wordRange.end);
    const entity = entities.get(word);

    if (!entity) return null;

    // Build hover content
    const contents: string[] = [`**${entity.type}**: ${entity.name}`];

    if ('path' in entity && entity.path) {
      contents.push(`**Path**: ${entity.path}`);
    }

    if ('signature' in entity && entity.signature) {
      contents.push(`**Signature**: \`${entity.signature}\``);
    }

    if ('description' in entity && entity.description) {
      contents.push(`**Description**: ${entity.description}`);
    }

    if ('imports' in entity && entity.imports.length > 0) {
      contents.push(`**Imports**: ${entity.imports.join(', ')}`);
    }

    if ('exports' in entity && entity.exports.length > 0) {
      contents.push(`**Exports**: ${entity.exports.join(', ')}`);
    }

    if ('calls' in entity && entity.calls.length > 0) {
      contents.push(`**Calls**: ${entity.calls.join(', ')}`);
    }

    return {
      contents: {
        kind: MarkupKind.Markdown,
        value: contents.join('\n\n'),
      },
    };
  }

  private provideDefinition(params: DefinitionParams): Location | null {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return null;

    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return null;

    const text = document.getText();
    const offset = document.offsetAt(params.position);
    const wordRange = this.getWordRangeAtPosition(text, offset);
    if (!wordRange) return null;

    const word = text.substring(wordRange.start, wordRange.end);
    const entity = entities.get(word);

    if (!entity) return null;

    // Return location of entity definition
    return {
      uri: params.textDocument.uri,
      range: {
        start: { line: entity.position.line - 1, character: 0 },
        end: { line: entity.position.line - 1, character: entity.raw.length },
      },
    };
  }

  private provideReferences(params: ReferenceParams): Location[] {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) return [];

    const entities = this.documentEntities.get(params.textDocument.uri);
    if (!entities) return [];

    const text = document.getText();
    const offset = document.offsetAt(params.position);
    const wordRange = this.getWordRangeAtPosition(text, offset);
    if (!wordRange) return [];

    const word = text.substring(wordRange.start, wordRange.end);
    const locations: Location[] = [];

    // Find all references to this entity
    const lines = text.split('\n');
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      if (!line) continue;

      let columnIndex = line.indexOf(word);
      while (columnIndex !== -1) {
        // Check if this is a word boundary
        const beforeChar = columnIndex > 0 ? line[columnIndex - 1] : ' ';
        const afterChar = columnIndex + word.length < line.length ? line[columnIndex + word.length] : ' ';
        
        if (this.isWordBoundary(beforeChar) && this.isWordBoundary(afterChar)) {
          locations.push({
            uri: params.textDocument.uri,
            range: {
              start: { line: lineIndex, character: columnIndex },
              end: { line: lineIndex, character: columnIndex + word.length },
            },
          });
        }
        
        columnIndex = line.indexOf(word, columnIndex + 1);
      }
    }

    return locations;
  }

  private getWordRangeAtPosition(text: string, offset: number): { start: number; end: number } | null {
    if (offset < 0 || offset >= text.length) return null;

    // Find word boundaries
    let start = offset;
    let end = offset;

    // Move start backward
    while (start > 0 && !this.isWordBoundary(text[start - 1])) {
      start--;
    }

    // Move end forward
    while (end < text.length && !this.isWordBoundary(text[end])) {
      end++;
    }

    if (start === end) return null;

    return { start, end };
  }

  private isWordBoundary(char: string | undefined): boolean {
    if (!char) return true;
    return /[\s\[\],<>@:~!=#\-]/.test(char);
  }

  start(): void {
    this.documents.listen(this.connection);
    this.connection.listen();
  }
}