import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-34-cli-tool', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-34-cli-tool.tmd';

  it('should validate CLI tool architecture', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    const parsed = checker.parse(content);
    
    // Should be valid - this is a well-structured CLI tool
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Should have the main program
    expect(parsed.entities.has('TaskMaster')).toBe(true);
    const app = parsed.entities.get('TaskMaster');
    expect(app?.type).toBe('Program');
    if (app?.type === 'Program') {
      expect(app.entry).toBe('MainFile');
      expect(app.version).toBe('1.5.0');
    }
    
    // Should have core files
    expect(parsed.entities.has('MainFile')).toBe(true);
    expect(parsed.entities.has('CLIFile')).toBe(true);
    expect(parsed.entities.has('CommandsFile')).toBe(true);
    expect(parsed.entities.has('TaskRunnerFile')).toBe(true);
    
    // Should have task management files
    expect(parsed.entities.has('TaskRegistryFile')).toBe(true);
    expect(parsed.entities.has('TaskSchedulerFile')).toBe(true);
    expect(parsed.entities.has('DependencyResolverFile')).toBe(true);
    expect(parsed.entities.has('WorkerPoolFile')).toBe(true);
    
    // Should have configuration files
    expect(parsed.entities.has('ConfigLoaderFile')).toBe(true);
    expect(parsed.entities.has('SchemaValidatorFile')).toBe(true);
    
    // Should have utility files
    expect(parsed.entities.has('UtilsFile')).toBe(true);
    expect(parsed.entities.has('Logger')).toBe(true);
    expect(parsed.entities.has('FileUtils')).toBe(true);
    expect(parsed.entities.has('ProcessUtils')).toBe(true);
    
    // Should have environment variables
    expect(parsed.entities.has('NODE_ENV')).toBe(true);
    expect(parsed.entities.has('TASKMASTER_HOME')).toBe(true);
    expect(parsed.entities.has('PARALLEL_JOBS')).toBe(true);
    expect(parsed.entities.has('LOG_LEVEL')).toBe(true);
    
    // Check environment variable types
    const nodeEnv = parsed.entities.get('NODE_ENV');
    expect(nodeEnv?.type).toBe('RunParameter');
    if (nodeEnv?.type === 'RunParameter') {
      expect(nodeEnv.paramType).toBe('env');
      expect(nodeEnv.defaultValue).toBe('development');
    }
    
    const parallelJobs = parsed.entities.get('PARALLEL_JOBS');
    expect(parallelJobs?.type).toBe('RunParameter');
    if (parallelJobs?.type === 'RunParameter') {
      expect(parallelJobs.paramType).toBe('env');
      expect(parallelJobs.defaultValue).toBe('4');
    }
    
    // Should have service classes
    expect(parsed.entities.has('cli')).toBe(true);
    expect(parsed.entities.has('taskRunner')).toBe(true);
    expect(parsed.entities.has('taskRegistry')).toBe(true);
    expect(parsed.entities.has('configLoader')).toBe(true);
    
    // Should have task types
    expect(parsed.entities.has('ShellTask')).toBe(true);
    expect(parsed.entities.has('FileTask')).toBe(true);
    expect(parsed.entities.has('HttpTask')).toBe(true);
    expect(parsed.entities.has('DockerTask')).toBe(true);
    
    // Should have key functions
    expect(parsed.entities.has('main')).toBe(true);
    expect(parsed.entities.has('runCommand')).toBe(true);
    expect(parsed.entities.has('buildCommand')).toBe(true);
    expect(parsed.entities.has('runTask')).toBe(true);
    expect(parsed.entities.has('loadConfig')).toBe(true);
    
    // Should have DTOs
    expect(parsed.entities.has('CLIArgs')).toBe(true);
    expect(parsed.entities.has('RunOptions')).toBe(true);
    expect(parsed.entities.has('TaskDefinition')).toBe(true);
    expect(parsed.entities.has('TaskResult')).toBe(true);
    expect(parsed.entities.has('Config')).toBe(true);
    
    // Check that key functions consume environment variables
    const runCommandFunc = parsed.entities.get('runCommand');
    expect(runCommandFunc?.type).toBe('Function');
    if (runCommandFunc?.type === 'Function') {
      expect(runCommandFunc.consumes).toContain('PARALLEL_JOBS');
      expect(runCommandFunc.consumes).toContain('NODE_VERSION');
    }
    
    const loadConfigFunc = parsed.entities.get('loadConfig');
    expect(loadConfigFunc?.type).toBe('Function');
    if (loadConfigFunc?.type === 'Function') {
      expect(loadConfigFunc.consumes).toContain('CONFIG_FILE');
      expect(loadConfigFunc.consumes).toContain('TASKMASTER_HOME');
    }
    
    // Should have external dependencies
    expect(parsed.dependencies.has('commander')).toBe(true);
    expect(parsed.dependencies.has('chalk')).toBe(true);
    expect(parsed.dependencies.has('ora')).toBe(true);
    expect(parsed.dependencies.has('yaml')).toBe(true);
    expect(parsed.dependencies.has('winston')).toBe(true);
    
    // Verify entity count is reasonable for a CLI tool
    expect(parsed.entities.size).toBeGreaterThan(70);
  });
});