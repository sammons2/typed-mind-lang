import * as path from 'path';
import { workspace, ExtensionContext, window, commands } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext): void {
  const fs = require('fs');
  
  // Try multiple paths for the LSP server module
  // 1. First try the bundled path (packaged extension)
  let serverModule = context.asAbsolutePath(path.join('lsp-bundled', 'cli.js'));
  
  if (!fs.existsSync(serverModule)) {
    // 2. Try the installed package path (production)
    serverModule = context.asAbsolutePath(
      path.join('node_modules', '@sammons', 'typed-mind-lsp', 'dist', 'cli.js')
    );
  }
  
  if (!fs.existsSync(serverModule)) {
    // 3. Try the workspace relative path (development)
    const workspacePath = path.join(__dirname, '..', '..', '..', 'typed-mind-lsp', 'dist', 'cli.js');
    if (fs.existsSync(workspacePath)) {
      serverModule = workspacePath;
    }
  }
  
  // Verify the server module exists
  if (!fs.existsSync(serverModule)) {
    const errorMsg = `TypedMind LSP server module not found`;
    console.error(errorMsg);
    console.error('Searched paths:', {
      bundled: context.asAbsolutePath(path.join('lsp-bundled', 'cli.js')),
      installed: context.asAbsolutePath(path.join('node_modules', '@sammons', 'typed-mind-lsp', 'dist', 'cli.js')),
      workspace: path.join(__dirname, '..', '..', '..', 'typed-mind-lsp', 'dist', 'cli.js')
    });
    
    window.showErrorMessage(errorMsg);
    return;
  }

  // The debug options for the server
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for TypedMind documents
    documentSelector: [{ scheme: 'file', language: 'typedmind' }],
    synchronize: {
      // Notify the server about file changes to '.tmd' files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/*.tmd'),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'typedmindLanguageServer',
    'TypedMind Language Server',
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start().catch((error) => {
    console.error('Failed to start TypedMind Language Server:', error);
    window.showErrorMessage(`TypedMind Language Server failed to start: ${error.message}`);
  });
  
  // Store the client in the context
  context.subscriptions.push(client);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}