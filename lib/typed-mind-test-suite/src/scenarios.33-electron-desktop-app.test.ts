import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-33-electron-desktop-app', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-33-electron-desktop-app.tmd';

  it('should validate Electron desktop application architecture', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    const parsed = checker.parse(content);
    
    // Should be valid - this is a well-structured Electron app
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Should have the main program
    expect(parsed.entities.has('CodeEditorApp')).toBe(true);
    const app = parsed.entities.get('CodeEditorApp');
    expect(app?.type).toBe('Program');
    if (app?.type === 'Program') {
      expect(app.entry).toBe('MainFile');
      expect(app.version).toBe('3.0.0');
    }
    
    // Should have main process files
    expect(parsed.entities.has('MainFile')).toBe(true);
    expect(parsed.entities.has('WindowManagerFile')).toBe(true);
    expect(parsed.entities.has('MenuBuilderFile')).toBe(true);
    expect(parsed.entities.has('IPCHandlerFile')).toBe(true);
    
    // Should have main process services
    expect(parsed.entities.has('FileSystemFile')).toBe(true);
    expect(parsed.entities.has('GitIntegrationFile')).toBe(true);
    expect(parsed.entities.has('TerminalServiceFile')).toBe(true);
    expect(parsed.entities.has('PluginManagerFile')).toBe(true);
    
    // Should have renderer process files
    expect(parsed.entities.has('RendererFile')).toBe(true);
    expect(parsed.entities.has('AppRendererFile')).toBe(true);
    expect(parsed.entities.has('StoreRendererFile')).toBe(true);
    
    // Should have UI components
    expect(parsed.entities.has('App')).toBe(true);
    expect(parsed.entities.has('TabBar')).toBe(true);
    expect(parsed.entities.has('EditorView')).toBe(true);
    expect(parsed.entities.has('SidebarView')).toBe(true);
    expect(parsed.entities.has('StatusBarView')).toBe(true);
    expect(parsed.entities.has('TerminalView')).toBe(true);
    
    // Should have editor components
    expect(parsed.entities.has('CodeEditor')).toBe(true);
    expect(parsed.entities.has('LineNumbers')).toBe(true);
    expect(parsed.entities.has('Minimap')).toBe(true);
    expect(parsed.entities.has('FileTree')).toBe(true);
    
    // Should have environment variables
    expect(parsed.entities.has('NODE_ENV')).toBe(true);
    expect(parsed.entities.has('UPDATE_SERVER_URL')).toBe(true);
    expect(parsed.entities.has('ELECTRON_VERSION')).toBe(true);
    
    // Check environment variable types
    const nodeEnv = parsed.entities.get('NODE_ENV');
    expect(nodeEnv?.type).toBe('RunParameter');
    if (nodeEnv?.type === 'RunParameter') {
      expect(nodeEnv.paramType).toBe('env');
      expect(nodeEnv.defaultValue).toBe('development');
    }
    
    const electronVersion = parsed.entities.get('ELECTRON_VERSION');
    expect(electronVersion?.type).toBe('RunParameter');
    if (electronVersion?.type === 'RunParameter') {
      expect(electronVersion.paramType).toBe('runtime');
      expect(electronVersion.defaultValue).toBe('28.0.0');
    }
    
    // Should have service classes
    expect(parsed.entities.has('WindowManager')).toBe(true);
    expect(parsed.entities.has('FileSystem')).toBe(true);
    expect(parsed.entities.has('GitIntegration')).toBe(true);
    expect(parsed.entities.has('TerminalService')).toBe(true);
    
    // Should have key functions
    expect(parsed.entities.has('createWindow')).toBe(true);
    expect(parsed.entities.has('readFile')).toBe(true);
    expect(parsed.entities.has('writeFile')).toBe(true);
    expect(parsed.entities.has('getStatus')).toBe(true);
    expect(parsed.entities.has('commit')).toBe(true);
    
    // Should have DTOs
    expect(parsed.entities.has('WindowOptions')).toBe(true);
    expect(parsed.entities.has('FileContent')).toBe(true);
    expect(parsed.entities.has('GitStatusResult')).toBe(true);
    expect(parsed.entities.has('Terminal')).toBe(true);
    
    // Check that key functions consume environment variables
    const createWindowFunc = parsed.entities.get('createWindow');
    expect(createWindowFunc?.type).toBe('Function');
    if (createWindowFunc?.type === 'Function') {
      expect(createWindowFunc.consumes).toContain('NODE_ENV');
      expect(createWindowFunc.consumes).toContain('ELECTRON_VERSION');
      expect(createWindowFunc.consumes).toContain('UPDATE_SERVER_URL');
    }
    
    // Should have external dependencies
    expect(parsed.dependencies.has('electron')).toBe(true);
    expect(parsed.dependencies.has('react')).toBe(true);
    expect(parsed.dependencies.has('@reduxjs/toolkit')).toBe(true);
    expect(parsed.dependencies.has('fs-extra')).toBe(true);
    expect(parsed.dependencies.has('simple-git')).toBe(true);
    
    // Verify entity count is reasonable for a full Electron app
    expect(parsed.entities.size).toBeGreaterThan(60);
  });
});