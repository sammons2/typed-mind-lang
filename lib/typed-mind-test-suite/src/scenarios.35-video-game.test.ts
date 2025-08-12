import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-35-video-game', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-35-video-game.tmd';

  it('should validate video game architecture', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    const parsed = checker.parse(content);
    
    // Should be valid - this is a well-structured video game
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Should have the main program
    expect(parsed.entities.has('DragonQuestRPG')).toBe(true);
    const app = parsed.entities.get('DragonQuestRPG');
    expect(app?.type).toBe('Program');
    if (app?.type === 'Program') {
      expect(app.entry).toBe('MainFile');
      expect(app.version).toBe('1.0.0');
    }
    
    // Should have core game system files
    expect(parsed.entities.has('MainFile')).toBe(true);
    expect(parsed.entities.has('SceneManagerFile')).toBe(true);
    expect(parsed.entities.has('InputManagerFile')).toBe(true);
    expect(parsed.entities.has('PlayerSystemFile')).toBe(true);
    expect(parsed.entities.has('CombatSystemFile')).toBe(true);
    expect(parsed.entities.has('AISystemFile')).toBe(true);
    
    // Should have world and gameplay systems
    expect(parsed.entities.has('WorldManagerFile')).toBe(true);
    expect(parsed.entities.has('QuestSystemFile')).toBe(true);
    expect(parsed.entities.has('NPCSystemFile')).toBe(true);
    expect(parsed.entities.has('InventorySystemFile')).toBe(true);
    
    // Should have networking
    expect(parsed.entities.has('NetworkManagerFile')).toBe(true);
    expect(parsed.entities.has('MultiplayerSyncFile')).toBe(true);
    
    // Should have UI systems
    expect(parsed.entities.has('UIManagerFile')).toBe(true);
    expect(parsed.entities.has('HUDFile')).toBe(true);
    expect(parsed.entities.has('MenuSystemFile')).toBe(true);
    
    // Should have audio and graphics
    expect(parsed.entities.has('AudioManagerFile')).toBe(true);
    expect(parsed.entities.has('RenderingManagerFile')).toBe(true);
    expect(parsed.entities.has('VFXManagerFile')).toBe(true);
    
    // Should have save system
    expect(parsed.entities.has('SaveSystemFile')).toBe(true);
    expect(parsed.entities.has('ResourceManagerFile')).toBe(true);
    
    // Should have UI components
    expect(parsed.entities.has('MainMenu')).toBe(true);
    expect(parsed.entities.has('HUD')).toBe(true);
    expect(parsed.entities.has('PauseMenu')).toBe(true);
    expect(parsed.entities.has('InventoryUI')).toBe(true);
    expect(parsed.entities.has('QuestLog')).toBe(true);
    
    // Should have environment variables
    expect(parsed.entities.has('UNITY_VERSION')).toBe(true);
    expect(parsed.entities.has('PHOTON_APP_ID')).toBe(true);
    expect(parsed.entities.has('BUILD_TARGET')).toBe(true);
    
    // Check environment variable types
    const unityVersion = parsed.entities.get('UNITY_VERSION');
    expect(unityVersion?.type).toBe('RunParameter');
    if (unityVersion?.type === 'RunParameter') {
      expect(unityVersion.paramType).toBe('env');
      expect(unityVersion.required).toBe(true);
      expect(unityVersion.defaultValue).toBe('2023.2.1f1');
    }
    
    const photonAppId = parsed.entities.get('PHOTON_APP_ID');
    expect(photonAppId?.type).toBe('RunParameter');
    if (photonAppId?.type === 'RunParameter') {
      expect(photonAppId.paramType).toBe('env');
      expect(photonAppId.required).toBe(true);
    }
    
    // Should have service classes
    expect(parsed.entities.has('GameManager')).toBe(true);
    expect(parsed.entities.has('SceneManager')).toBe(true);
    expect(parsed.entities.has('PlayerController')).toBe(true);
    expect(parsed.entities.has('CombatSystem')).toBe(true);
    expect(parsed.entities.has('AIController')).toBe(true);
    
    // Should have key functions
    expect(parsed.entities.has('StartGame')).toBe(true);
    expect(parsed.entities.has('PauseGame')).toBe(true);
    expect(parsed.entities.has('LoadScene')).toBe(true);
    expect(parsed.entities.has('Attack')).toBe(true);
    expect(parsed.entities.has('UseSkill')).toBe(true);
    expect(parsed.entities.has('SaveGame')).toBe(true);
    
    // Should have DTOs
    expect(parsed.entities.has('GameState')).toBe(true);
    expect(parsed.entities.has('PlayerStats')).toBe(true);
    expect(parsed.entities.has('Vector3')).toBe(true);
    expect(parsed.entities.has('GameObject')).toBe(true);
    expect(parsed.entities.has('Item')).toBe(true);
    expect(parsed.entities.has('Quest')).toBe(true);
    
    // Check that key functions consume environment variables
    const connectFunc = parsed.entities.get('Connect');
    expect(connectFunc?.type).toBe('Function');
    if (connectFunc?.type === 'Function') {
      expect(connectFunc.consumes).toContain('PHOTON_APP_ID');
    }
    
    const initializeFunc = parsed.entities.get('Initialize');
    expect(initializeFunc?.type).toBe('Function');
    if (initializeFunc?.type === 'Function') {
      expect(initializeFunc.consumes).toContain('UNITY_VERSION');
      expect(initializeFunc.consumes).toContain('BUILD_TARGET');
    }
    
    // Check game-specific functionality
    const useSkillFunc = parsed.entities.get('UseSkill');
    expect(useSkillFunc?.type).toBe('Function');
    if (useSkillFunc?.type === 'Function') {
      expect(useSkillFunc.consumes).toContain('ENABLE_MODDING');
      expect(useSkillFunc.affects).toContain('SkillBar');
      expect(useSkillFunc.affects).toContain('ManaBar');
    }
    
    // Should have AI subclasses
    expect(parsed.entities.has('EnemyAI')).toBe(true);
    expect(parsed.entities.has('CompanionAI')).toBe(true);
    
    // Verify entity count is reasonable for a full game
    expect(parsed.entities.size).toBeGreaterThan(90);
  });
});