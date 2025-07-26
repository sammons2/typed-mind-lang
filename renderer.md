App that renders the parsed output of the spec language

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Architecture Viewer</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0d1117;
            color: #c9d1d9;
            overflow: hidden;
        }
        
        #container {
            display: flex;
            height: 100vh;
        }
        
        #sidebar {
            width: 300px;
            background: #161b22;
            border-right: 1px solid #30363d;
            overflow-y: auto;
            padding: 16px;
        }
        
        #canvas {
            flex: 1;
            position: relative;
            overflow: hidden;
        }
        
        .entity-list {
            margin-top: 16px;
        }
        
        .entity-group {
            margin-bottom: 24px;
        }
        
        .entity-group h3 {
            color: #58a6ff;
            font-size: 14px;
            text-transform: uppercase;
            margin: 0 0 8px 0;
        }
        
        .entity-item {
            padding: 8px 12px;
            margin: 4px 0;
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .entity-item:hover {
            background: #21262d;
            border-color: #58a6ff;
        }
        
        .entity-item.selected {
            background: #1f6feb;
            border-color: #58a6ff;
        }
        
        .entity-name {
            font-weight: 600;
            color: #f0f6fc;
        }
        
        .entity-path {
            font-size: 12px;
            color: #8b949e;
            margin-top: 4px;
        }
        
        #graph {
            width: 100%;
            height: 100%;
        }
        
        .node {
            cursor: pointer;
        }
        
        .node rect {
            fill: #21262d;
            stroke: #30363d;
            stroke-width: 2;
            transition: all 0.2s;
        }
        
        .node:hover rect {
            fill: #30363d;
            stroke: #58a6ff;
        }
        
        .node.selected rect {
            fill: #1f6feb;
            stroke: #58a6ff;
            stroke-width: 3;
        }
        
        .node text {
            fill: #f0f6fc;
            font-size: 14px;
            font-weight: 600;
            pointer-events: none;
        }
        
        .link {
            fill: none;
            stroke: #484f58;
            stroke-width: 2;
            marker-end: url(#arrowhead);
        }
        
        .link.import {
            stroke: #3fb950;
        }
        
        .link.export {
            stroke: #58a6ff;
        }
        
        .link.call {
            stroke: #f85149;
            stroke-dasharray: 5,5;
        }
        
        #details {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 300px;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 16px;
            display: none;
        }
        
        #details h3 {
            margin: 0 0 12px 0;
            color: #58a6ff;
        }
        
        #details .detail-row {
            margin: 8px 0;
            font-size: 14px;
        }
        
        #details .detail-label {
            color: #8b949e;
            display: inline-block;
            width: 80px;
        }
        
        #details .detail-value {
            color: #f0f6fc;
        }
        
        .controls {
            position: absolute;
            bottom: 16px;
            left: 16px;
            display: flex;
            gap: 8px;
        }
        
        button {
            background: #21262d;
            border: 1px solid #30363d;
            color: #c9d1d9;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        
        button:hover {
            background: #30363d;
            border-color: #58a6ff;
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="sidebar">
            <h2 style="margin: 0 0 16px 0; color: #f0f6fc;">Architecture Explorer</h2>
            <input type="text" id="search" placeholder="Search entities..." style="
                width: 100%;
                padding: 8px 12px;
                background: #0d1117;
                border: 1px solid #30363d;
                border-radius: 6px;
                color: #c9d1d9;
                font-size: 14px;
            ">
            <div class="entity-list" id="entityList"></div>
        </div>
        
        <div id="canvas">
            <svg id="graph"></svg>
            <div id="details"></div>
            <div class="controls">
                <button onclick="renderer.zoomFit()">Fit View</button>
                <button onclick="renderer.toggleLayout()">Toggle Layout</button>
                <button onclick="renderer.clearSelection()">Clear Selection</button>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
    <script>
        // Sample DSL data - in real implementation, this would come from the parser
        const sampleData = {
            entities: [
                {
                    name: 'TodoApp',
                    type: 'Program',
                    entry: 'AppEntry'
                },
                {
                    name: 'AppEntry',
                    type: 'File',
                    path: 'src/index.ts',
                    imports: ['ExpressSetup', 'Routes', 'Database'],
                    exports: ['startServer']
                },
                {
                    name: 'ExpressSetup',
                    type: 'File',
                    path: 'src/server.ts',
                    imports: ['express', 'middleware'],
                    exports: ['app']
                },
                {
                    name: 'Routes',
                    type: 'File',
                    path: 'src/routes/index.ts',
                    imports: ['TodoRoutes', 'UserRoutes'],
                    exports: ['router']
                },
                {
                    name: 'TodoRoutes',
                    type: 'File',
                    path: 'src/routes/todos.ts',
                    imports: ['TodoController'],
                    exports: ['todoRouter']
                },
                {
                    name: 'TodoController',
                    type: 'Class',
                    methods: ['create', 'read', 'update', 'delete']
                },
                {
                    name: 'Database',
                    type: 'File',
                    path: 'src/db/index.ts',
                    imports: ['mongoose'],
                    exports: ['connection', 'models']
                }
            ]
        };

        class InteractiveRenderer {
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

                const links = [];
                this.data.entities.forEach(entity => {
                    if (entity.imports) {
                        entity.imports.forEach(imp => {
                            if (nodes.find(n => n.id === imp)) {
                                links.push({
                                    source: entity.name,
                                    target: imp,
                                    type: 'import'
                                });
                            }
                        });
                    }
                });

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
                    .attr('class', d => `link ${d.type}`);

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

                    node.attr('transform', d => `translate(${d.x},${d.y})`);
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
                
                let html = `<h3>${entity.name}</h3>`;
                html += `<div class="detail-row"><span class="detail-label">Type:</span><span class="detail-value">${entity.type}</span></div>`;
                
                if (entity.path) {
                    html += `<div class="detail-row"><span class="detail-label">Path:</span><span class="detail-value">${entity.path}</span></div>`;
                }
                
                if (entity.imports) {
                    html += `<div class="detail-row"><span class="detail-label">Imports:</span><span class="detail-value">${entity.imports.join(', ')}</span></div>`;
                }
                
                if (entity.exports) {
                    html += `<div class="detail-row"><span class="detail-label">Exports:</span><span class="detail-value">${entity.exports.join(', ')}</span></div>`;
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
                // Toggle between force and hierarchical layout
                // Implementation would go here
                alert('Layout toggle would switch between force-directed and hierarchical views');
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
        const renderer = new InteractiveRenderer(sampleData);
    </script>
</body>
</html>
```