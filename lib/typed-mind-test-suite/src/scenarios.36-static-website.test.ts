import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DSLChecker } from '@sammons/typed-mind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('scenario-36-static-website', () => {
  const checker = new DSLChecker();
  const scenarioFile = 'scenario-36-static-website.tmd';

  it('should validate static website with build pipeline architecture', () => {
    const content = readFileSync(join(__dirname, '..', 'scenarios', scenarioFile), 'utf-8');
    const result = checker.check(content);
    const parsed = checker.parse(content);
    
    // Should be invalid due to orphaned entities
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Should have the main program
    expect(parsed.entities.has('PortfolioSite')).toBe(true);
    const app = parsed.entities.get('PortfolioSite');
    expect(app?.type).toBe('Program');
    if (app?.type === 'Program') {
      expect(app.entry).toBe('BuildFile');
      expect(app.version).toBe('1.0.0');
    }
    
    // Should have build system files
    expect(parsed.entities.has('BuildFile')).toBe(true);
    expect(parsed.entities.has('PostCSSConfigFile')).toBe(true);
    expect(parsed.entities.has('TailwindConfigFile')).toBe(true);
    
    // Should have page files
    expect(parsed.entities.has('HomePageFile')).toBe(true);
    expect(parsed.entities.has('BlogPageFile')).toBe(true);
    expect(parsed.entities.has('BlogPostFile')).toBe(true);
    expect(parsed.entities.has('ProjectsPageFile')).toBe(true);
    expect(parsed.entities.has('AboutPageFile')).toBe(true);
    expect(parsed.entities.has('ContactPageFile')).toBe(true);
    
    // Should have API routes
    expect(parsed.entities.has('ContactAPIFile')).toBe(true);
    expect(parsed.entities.has('OGImageAPIFile')).toBe(true);
    
    // Should have layout files
    expect(parsed.entities.has('RootLayoutFile')).toBe(true);
    expect(parsed.entities.has('HeaderFile')).toBe(true);
    expect(parsed.entities.has('FooterFile')).toBe(true);
    
    // Should have utility files
    expect(parsed.entities.has('ContentLoaderFile')).toBe(true);
    expect(parsed.entities.has('MDXComponentsFile')).toBe(true);
    expect(parsed.entities.has('UtilsFile')).toBe(true);
    expect(parsed.entities.has('HooksFile')).toBe(true);
    
    // Should have UI components
    expect(parsed.entities.has('HomePage')).toBe(true);
    expect(parsed.entities.has('BlogListPage')).toBe(true);
    expect(parsed.entities.has('BlogPostPage')).toBe(true);
    expect(parsed.entities.has('ProjectsPage')).toBe(true);
    expect(parsed.entities.has('AboutPage')).toBe(true);
    expect(parsed.entities.has('ContactPage')).toBe(true);
    
    // Should have shared components
    expect(parsed.entities.has('Header')).toBe(true);
    expect(parsed.entities.has('Footer')).toBe(true);
    expect(parsed.entities.has('Navigation')).toBe(true);
    expect(parsed.entities.has('ThemeToggle')).toBe(true);
    
    // Should have content components
    expect(parsed.entities.has('BlogCard')).toBe(true);
    expect(parsed.entities.has('ProjectCard')).toBe(true);
    expect(parsed.entities.has('ContactForm')).toBe(true);
    expect(parsed.entities.has('Newsletter')).toBe(true);
    
    // Should have environment variables
    expect(parsed.entities.has('NEXT_PUBLIC_SITE_URL')).toBe(true);
    expect(parsed.entities.has('RESEND_API_KEY')).toBe(true);
    expect(parsed.entities.has('NODE_VERSION')).toBe(true);
    
    // Check environment variable types
    const siteUrl = parsed.entities.get('NEXT_PUBLIC_SITE_URL');
    expect(siteUrl?.type).toBe('RunParameter');
    if (siteUrl?.type === 'RunParameter') {
      expect(siteUrl.paramType).toBe('env');
      expect(siteUrl.required).toBe(true);
    }
    
    const nodeVersion = parsed.entities.get('NODE_VERSION');
    expect(nodeVersion?.type).toBe('RunParameter');
    if (nodeVersion?.type === 'RunParameter') {
      expect(nodeVersion.paramType).toBe('runtime');
      expect(nodeVersion.defaultValue).toBe('20.x');
    }
    
    // Should have content processing classes
    expect(parsed.entities.has('MDXProcessor')).toBe(true);
    expect(parsed.entities.has('ImageOptimizer')).toBe(true);
    expect(parsed.entities.has('RSSGenerator')).toBe(true);
    expect(parsed.entities.has('SitemapGenerator')).toBe(true);
    
    // Should have key functions
    expect(parsed.entities.has('build')).toBe(true);
    expect(parsed.entities.has('getAllPosts')).toBe(true);
    expect(parsed.entities.has('getPostBySlug')).toBe(true);
    expect(parsed.entities.has('getProjects')).toBe(true);
    expect(parsed.entities.has('generateRSSFeed')).toBe(true);
    expect(parsed.entities.has('generateSitemap')).toBe(true);
    
    // Should have DTOs
    expect(parsed.entities.has('Post')).toBe(true);
    expect(parsed.entities.has('PostParams')).toBe(true);
    expect(parsed.entities.has('MDXSource')).toBe(true);
    expect(parsed.entities.has('ProcessedMDX')).toBe(true);
    expect(parsed.entities.has('ContactRequest')).toBe(true);
    expect(parsed.entities.has('ContactResponse')).toBe(true);
    
    // Check that key functions consume environment variables
    const buildFunc = parsed.entities.get('build');
    expect(buildFunc?.type).toBe('Function');
    if (buildFunc?.type === 'Function') {
      expect(buildFunc.consumes).toContain('NODE_VERSION');
      expect(buildFunc.consumes).toContain('DEPLOYMENT_TARGET');
    }
    
    const rssFunc = parsed.entities.get('generateRSSFeed');
    expect(rssFunc?.type).toBe('Function');
    if (rssFunc?.type === 'Function') {
      expect(rssFunc.consumes).toContain('NEXT_PUBLIC_SITE_URL');
    }
    
    const postFunc = parsed.entities.get('POST');
    expect(postFunc?.type).toBe('Function');
    if (postFunc?.type === 'Function') {
      expect(postFunc.consumes).toContain('RESEND_API_KEY');
    }
    
    // Should have external dependencies
    expect(parsed.dependencies.has('next')).toBe(true);
    expect(parsed.dependencies.has('react')).toBe(true);
    expect(parsed.dependencies.has('tailwindcss')).toBe(true);
    expect(parsed.dependencies.has('@mdx-js/loader')).toBe(true);
    expect(parsed.dependencies.has('sharp')).toBe(true);
    
    // Should have assets
    expect(parsed.entities.has('logo')).toBe(true);
    expect(parsed.entities.has('favicon')).toBe(true);
    expect(parsed.entities.has('fontInter')).toBe(true);
    
    // Verify entity count is reasonable for a static website
    expect(parsed.entities.size).toBeGreaterThan(100);
  });
});