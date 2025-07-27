import { TypedMindLanguageServer } from './server';

export function startServer(): void {
  const server = new TypedMindLanguageServer();
  server.start();
}