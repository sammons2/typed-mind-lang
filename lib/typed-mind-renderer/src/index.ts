import { readFileSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import type { ProgramGraph, ValidationResult, FileEntity, FunctionEntity, ProgramEntity } from '@sammons/typed-mind';

export interface RendererOptions {
  port?: number;
  host?: string;
  openBrowser?: boolean;
}

export class TypedMindRenderer {
  private programGraph: ProgramGraph | null = null;
  private validationResult: ValidationResult | null = null;

  constructor(private options: RendererOptions = {}) {
    this.options = {
      port: 3000,
      host: 'localhost',
      openBrowser: true,
      ...options,
    };
  }

  setProgramGraph(graph: ProgramGraph): void {
    this.programGraph = graph;
  }

  setValidationResult(result: ValidationResult): void {
    this.validationResult = result;
  }

  async serve(): Promise<void> {
    const server = createServer((req, res) => {
      const url = req.url || '/';

      if (url === '/') {
        const htmlPath = join(__dirname, 'static', 'index.html');
        const html = readFileSync(htmlPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      } else if (url === '/renderer.js') {
        const js = this.generateRendererJS();
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(js);
      } else if (url === '/api/graph') {
        const data = this.getGraphData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    const { port, host } = this.options;
    server.listen(port, host, () => {
      console.log(`TypedMind renderer running at http://${host}:${port}`);
      if (this.options.openBrowser) {
        this.openInBrowser(`http://${host}:${port}`);
      }
    });
  }

  generateStaticHTML(): string {
    const htmlPath = join(__dirname, 'static', 'index.html');
    let html = readFileSync(htmlPath, 'utf-8');

    // Replace the external script with inline JavaScript
    const scriptTag = '<script src="renderer.js"></script>';
    const inlineScript = `<script>
${this.generateRendererJS()}
</script>`;

    html = html.replace(scriptTag, inlineScript);
    return html;
  }

  private generateRendererJS(): string {
    const data = this.getGraphData();
    return `
// Generated TypedMind Renderer
(function() {
  const graphData = ${JSON.stringify(data)};

  class TypedMindInteractiveRenderer {
    constructor(data) {
      this.data = data;
      this.selectedNode = null;
      this.layoutType = 'force';
      this.init();
    }

    init() {
      this.renderSidebar();
      this.renderGraph();
      this.setupSearch();
      this.renderErrors();
    }

    renderSidebar() {
      const groups = {};
      this.data.entities.forEach(entity => {
        if (!groups[entity.type]) groups[entity.type] = [];
        groups[entity.type].push(entity);
      });

      const listEl = document.getElementById('entityList');
      listEl.innerHTML = '';

      Object.entries(groups).forEach(([type, entities]) => {
        const groupEl = document.createElement('div');
        groupEl.className = 'entity-group';
        
        const titleEl = document.createElement('h3');
        titleEl.textContent = type + 's';
        groupEl.appendChild(titleEl);

        entities.forEach(entity => {
          const itemEl = document.createElement('div');
          itemEl.className = 'entity-item';
          itemEl.dataset.name = entity.name;
          
          const nameEl = document.createElement('div');
          nameEl.className = 'entity-name';
          nameEl.textContent = entity.name;
          itemEl.appendChild(nameEl);

          if (entity.path) {
            const pathEl = document.createElement('div');
            pathEl.className = 'entity-path';
            pathEl.textContent = entity.path;
            itemEl.appendChild(pathEl);
          }

          itemEl.onclick = () => this.selectNode(entity.name);
          groupEl.appendChild(itemEl);
        });

        listEl.appendChild(groupEl);
      });
    }

    renderGraph() {
      const width = window.innerWidth - 300;
      const height = window.innerHeight;

      const svg = d3.select('#graph')
        .attr('width', width)
        .attr('height', height);

      svg.selectAll('*').remove();

      // Create arrow marker
      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 30)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#484f58');

      // Create nodes and links
      const nodes = this.data.entities.map(e => ({
        id: e.name,
        ...e
      }));

      const links = this.data.links;

      // Create force simulation
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const g = svg.append('g');

      const link = g.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('class', d => \`link \${d.type}\`);

      const node = g.append('g')
        .selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', 'node')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      node.append('rect')
        .attr('width', 120)
        .attr('height', 40)
        .attr('x', -60)
        .attr('y', -20)
        .attr('rx', 6);

      node.append('text')
        .text(d => d.id)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

      node.on('click', (event, d) => {
        this.selectNode(d.id);
      });

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('transform', d => \`translate(\${d.x},\${d.y})\`);
      });

      // Zoom behavior
      const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      this.svg = svg;
      this.g = g;
      this.zoom = zoom;
      this.simulation = simulation;

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }

    selectNode(name) {
      this.selectedNode = name;
      
      // Update sidebar
      document.querySelectorAll('.entity-item').forEach(el => {
        el.classList.toggle('selected', el.dataset.name === name);
      });

      // Update graph
      d3.selectAll('.node').classed('selected', d => d.id === name);

      // Show details
      const entity = this.data.entities.find(e => e.name === name);
      if (entity) {
        this.showDetails(entity);
      }
    }

    showDetails(entity) {
      const detailsEl = document.getElementById('details');
      detailsEl.style.display = 'block';
      
      let html = \`<h3>\${entity.name}</h3>\`;
      html += \`<div class="detail-row"><span class="detail-label">Type:</span><span class="detail-value">\${entity.type}</span></div>\`;
      
      if (entity.path) {
        html += \`<div class="detail-row"><span class="detail-label">Path:</span><span class="detail-value">\${entity.path}</span></div>\`;
      }
      
      if (entity.imports && entity.imports.length > 0) {
        html += \`<div class="detail-row"><span class="detail-label">Imports:</span><span class="detail-value">\${entity.imports.join(', ')}</span></div>\`;
      }
      
      if (entity.exports && entity.exports.length > 0) {
        html += \`<div class="detail-row"><span class="detail-label">Exports:</span><span class="detail-value">\${entity.exports.join(', ')}</span></div>\`;
      }

      if (entity.signature) {
        html += \`<div class="detail-row"><span class="detail-label">Signature:</span><span class="detail-value">\${entity.signature}</span></div>\`;
      }

      if (entity.description) {
        html += \`<div class="detail-row"><span class="detail-label">Description:</span><span class="detail-value">\${entity.description}</span></div>\`;
      }

      if (entity.calls && entity.calls.length > 0) {
        html += \`<div class="detail-row"><span class="detail-label">Calls:</span><span class="detail-value">\${entity.calls.join(', ')}</span></div>\`;
      }

      if (entity.methods && entity.methods.length > 0) {
        html += \`<div class="detail-row"><span class="detail-label">Methods:</span><span class="detail-value">\${entity.methods.join(', ')}</span></div>\`;
      }
      
      detailsEl.innerHTML = html;
    }

    setupSearch() {
      const searchEl = document.getElementById('search');
      searchEl.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.entity-item').forEach(el => {
          const matches = el.textContent.toLowerCase().includes(query);
          el.style.display = matches ? 'block' : 'none';
        });
      });
    }

    renderErrors() {
      if (!this.data.errors || this.data.errors.length === 0) return;

      const errorPanel = document.getElementById('error-panel');
      errorPanel.style.display = 'block';
      
      let html = '<h3>Validation Errors</h3>';
      this.data.errors.forEach(error => {
        html += '<div class="error-item">';
        html += \`\${error.severity.toUpperCase()} at line \${error.position.line}, col \${error.position.column}: \${error.message}\`;
        if (error.suggestion) {
          html += \`<div class="suggestion">Suggestion: \${error.suggestion}</div>\`;
        }
        html += '</div>';
      });
      
      errorPanel.innerHTML = html;
    }

    zoomFit() {
      const bounds = this.g.node().getBBox();
      const fullWidth = this.svg.node().clientWidth;
      const fullHeight = this.svg.node().clientHeight;
      const width = bounds.width;
      const height = bounds.height;
      const midX = bounds.x + width / 2;
      const midY = bounds.y + height / 2;
      const scale = 0.8 / Math.max(width / fullWidth, height / fullHeight);
      const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

      this.svg.transition().duration(750).call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );
    }

    toggleLayout() {
      alert('Layout toggle between force-directed and hierarchical views coming soon!');
    }

    clearSelection() {
      this.selectedNode = null;
      document.querySelectorAll('.entity-item').forEach(el => {
        el.classList.remove('selected');
      });
      d3.selectAll('.node').classed('selected', false);
      document.getElementById('details').style.display = 'none';
    }
  }

  // Initialize renderer
  window.typedMindRenderer = new TypedMindInteractiveRenderer(graphData);
})();
`;
  }

  private getGraphData() {
    if (!this.programGraph) {
      return {
        entities: [],
        links: [],
        errors: [],
      };
    }

    const entities = Array.from(this.programGraph.entities.values());
    const links: any[] = [];

    // Create links from dependencies
    for (const entity of entities) {
      if (entity.type === 'File' || entity.type === 'Function') {
        const typedEntity = entity as FileEntity | FunctionEntity;
        if ('imports' in typedEntity) {
          for (const imp of typedEntity.imports) {
            if (!imp.includes('*') && this.programGraph.entities.has(imp)) {
              links.push({
                source: entity.name,
                target: imp,
                type: 'import',
              });
            }
          }
        }
      }
      if (entity.type === 'Function') {
        const funcEntity = entity as FunctionEntity;
        for (const call of funcEntity.calls) {
          if (this.programGraph.entities.has(call)) {
            links.push({
              source: entity.name,
              target: call,
              type: 'call',
            });
          }
        }
      }
      if (entity.type === 'Program') {
        const progEntity = entity as ProgramEntity;
        if (this.programGraph.entities.has(progEntity.entry)) {
          links.push({
            source: entity.name,
            target: progEntity.entry,
            type: 'export',
          });
        }
      }
    }

    return {
      entities,
      links,
      errors: this.validationResult?.errors || [],
    };
  }

  private openInBrowser(url: string): void {
    const { exec } = require('child_process');
    const platform = process.platform;
    
    let command: string;
    if (platform === 'darwin') {
      command = `open ${url}`;
    } else if (platform === 'win32') {
      command = `start ${url}`;
    } else {
      command = `xdg-open ${url}`;
    }
    
    exec(command, (error: Error | null) => {
      if (error) {
        console.error('Failed to open browser:', error);
      }
    });
  }
}