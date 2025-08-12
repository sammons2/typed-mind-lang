import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-32-spa-react-app', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-32-spa-react-app.tmd';

  it('should validate SPA React application architecture', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    const parsed = checker.parse(content);
    
    // Should be valid - this is a well-structured React SPA
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    
    // Should have the main program
    expect(parsed.entities.has('EcommerceApp')).toBe(true);
    const app = parsed.entities.get('EcommerceApp');
    expect(app?.type).toBe('Program');
    if (app?.type === 'Program') {
      expect(app.entry).toBe('MainFile');
      expect(app.version).toBe('2.1.0');
    }
    
    // Should have core files
    expect(parsed.entities.has('MainFile')).toBe(true);
    expect(parsed.entities.has('AppFile')).toBe(true);
    expect(parsed.entities.has('RouterFile')).toBe(true);
    expect(parsed.entities.has('StoreFile')).toBe(true);
    
    // Should have Redux slices
    expect(parsed.entities.has('AuthSliceFile')).toBe(true);
    expect(parsed.entities.has('CartSliceFile')).toBe(true);
    expect(parsed.entities.has('ProductSliceFile')).toBe(true);
    expect(parsed.entities.has('OrderSliceFile')).toBe(true);
    
    // Should have UI components
    expect(parsed.entities.has('App')).toBe(true);
    expect(parsed.entities.has('Header')).toBe(true);
    expect(parsed.entities.has('Footer')).toBe(true);
    expect(parsed.entities.has('Router')).toBe(true);
    
    // Should have page components
    expect(parsed.entities.has('HomePage')).toBe(true);
    expect(parsed.entities.has('ProductListPage')).toBe(true);
    expect(parsed.entities.has('ProductDetailPage')).toBe(true);
    expect(parsed.entities.has('CartPage')).toBe(true);
    expect(parsed.entities.has('CheckoutPage')).toBe(true);
    
    // Should have environment variables
    expect(parsed.entities.has('API_URL')).toBe(true);
    expect(parsed.entities.has('STRIPE_PUBLIC_KEY')).toBe(true);
    expect(parsed.entities.has('NODE_ENV')).toBe(true);
    
    // Check environment variable types
    const apiUrl = parsed.entities.get('API_URL');
    expect(apiUrl?.type).toBe('RunParameter');
    if (apiUrl?.type === 'RunParameter') {
      expect(apiUrl.paramType).toBe('env');
      expect(apiUrl.required).toBe(true);
    }
    
    const nodeEnv = parsed.entities.get('NODE_ENV');
    expect(nodeEnv?.type).toBe('RunParameter');
    if (nodeEnv?.type === 'RunParameter') {
      expect(nodeEnv.paramType).toBe('env');
      expect(nodeEnv.defaultValue).toBe('development');
    }
    
    // Should have service functions
    expect(parsed.entities.has('login')).toBe(true);
    expect(parsed.entities.has('addToCart')).toBe(true);
    expect(parsed.entities.has('fetchProducts')).toBe(true);
    expect(parsed.entities.has('createOrder')).toBe(true);
    
    // Should have DTOs
    expect(parsed.entities.has('LoginDTO')).toBe(true);
    expect(parsed.entities.has('ProductDTO')).toBe(true);
    expect(parsed.entities.has('OrderDTO')).toBe(true);
    
    // Check that key functions consume environment variables
    const loginFunc = parsed.entities.get('login');
    expect(loginFunc?.type).toBe('Function');
    if (loginFunc?.type === 'Function') {
      expect(loginFunc.consumes).toContain('API_URL');
      expect(loginFunc.consumes).toContain('NODE_ENV');
    }
    
    const createOrderFunc = parsed.entities.get('createOrder');
    expect(createOrderFunc?.type).toBe('Function');
    if (createOrderFunc?.type === 'Function') {
      expect(createOrderFunc.consumes).toContain('API_URL');
      expect(createOrderFunc.consumes).toContain('STRIPE_PUBLIC_KEY');
    }
    
    // Should have external dependencies
    expect(parsed.dependencies.has('react')).toBe(true);
    expect(parsed.dependencies.has('react-dom')).toBe(true);
    expect(parsed.dependencies.has('@reduxjs/toolkit')).toBe(true);
    expect(parsed.dependencies.has('axios')).toBe(true);
    
    // Verify entity count is reasonable for a full SPA
    expect(parsed.entities.size).toBeGreaterThan(80);
  });
});