// D3.js Family Tree Component
class FamilyTreeComponent {
    constructor(containerId, initialData, options = {}) {
        this.containerId = containerId;
        this.initialData = initialData;
        this.zoom = options.zoom || 0.8;
        this.onNodeClick = options.onNodeClick || (() => {});
        
        this.dimensions = {
            width: 800,
            height: 600
        };
        
        this.tooltip = {
            visible: false,
            content: '',
            x: 0,
            y: 0
        };
        
        this.init();
    }
    
    init() {
        this.container = d3.select(`#${this.containerId}`);
        this.setupSVG();
        this.updateDimensions();
        this.render();
        
        // Setup resize observer
        const resizeObserver = new ResizeObserver(() => {
            this.updateDimensions();
            this.render();
        });
        resizeObserver.observe(this.container.node());
    }
    
    setupSVG() {
        this.svg = this.container.append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');
    }
    
    updateDimensions() {
        const containerRect = this.container.node().getBoundingClientRect();
        this.dimensions = {
            width: Math.max(320, containerRect.width - 32),
            height: Math.max(300, Math.min(800, containerRect.height || 600))
        };
        
        if (this.svg) {
            this.svg.attr('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`);
        }
    }
    
    getLayoutValues() {
        const w = this.dimensions.width;
        const isMobile = w < 768;
        const isTablet = w >= 768 && w < 1024;
        
        let NODE_WIDTH, NODE_HEIGHT, SPOUSE_GAP, GENERATION_GAP, MARRIAGE_LINE_HEIGHT, HORIZONTAL_SPACING;
        
        if (isMobile) {
            NODE_WIDTH = Math.max(120, Math.min(140, w * 0.28));
            NODE_HEIGHT = NODE_WIDTH + 20;
            SPOUSE_GAP = Math.max(150, Math.min(180, w * 0.35));
            GENERATION_GAP = Math.max(100, Math.min(120, w * 0.18));
            MARRIAGE_LINE_HEIGHT = Math.max(15, Math.min(25, w * 0.03));
            HORIZONTAL_SPACING = Math.max(30, Math.min(60, w * 0.08));
        } else if (isTablet) {
            NODE_WIDTH = Math.max(140, Math.min(160, w * 0.20));
            NODE_HEIGHT = NODE_WIDTH + 25;
            SPOUSE_GAP = Math.max(180, Math.min(220, w * 0.25));
            GENERATION_GAP = Math.max(120, Math.min(150, w * 0.16));
            MARRIAGE_LINE_HEIGHT = Math.max(20, Math.min(30, w * 0.028));
            HORIZONTAL_SPACING = Math.max(40, Math.min(70, w * 0.07));
        } else {
            NODE_WIDTH = Math.max(160, Math.min(200, w * 0.18));
            NODE_HEIGHT = NODE_WIDTH + 30;
            SPOUSE_GAP = Math.max(200, Math.min(280, w * 0.22));
            GENERATION_GAP = Math.max(140, Math.min(180, w * 0.15));
            MARRIAGE_LINE_HEIGHT = Math.max(25, Math.min(35, w * 0.03));
            HORIZONTAL_SPACING = Math.max(50, Math.min(90, w * 0.08));
        }
        
        return {
            NODE_WIDTH,
            NODE_HEIGHT,
            SPOUSE_GAP,
            GENERATION_GAP,
            MARRIAGE_LINE_HEIGHT,
            HORIZONTAL_SPACING,
            IS_MOBILE: isMobile,
            IS_TABLET: isTablet,
            IS_DESKTOP: !isMobile && !isTablet
        };
    }
    
    processNode(node, depth = 0, partnerOffset = 0) {
        if (!node) return null;
        
        return {
            id: node.id,
            userId: node.user_id,
            firstName: node.first_name || node.firstName || (node.name?.split(' ')[0] ?? '?'),
            lastName: node.last_name || node.lastName || (node.name?.split(' ').slice(1).join(' ') ?? ''),
            dateOfBirth: node.date_of_birth || node.attributes?.date_of_birth || '',
            dateOfDeath: node.date_of_death || node.attributes?.date_of_death || '',
            gender: node.gender || node.attributes?.gender || 'other',
            relationship_type: node.relationship_type || node.attributes?.relationship_type || '',
            isCreator: node.is_creator ?? node.attributes?.is_creator ?? false,
            roleInTree: node.relationship_type || node.attributes?.relationship_type || '',
            depth,
            partnerOffset,
            rawPartners: node.partners || [],
            rawChildren: node.children || [],
            children: (node.children || []).map((c) => this.processNode(c, depth + 1))
        };
    }
    
    render() {
        if (!this.initialData) return;
        
        const layoutValues = this.getLayoutValues();
        const { NODE_WIDTH, NODE_HEIGHT, SPOUSE_GAP, GENERATION_GAP, MARRIAGE_LINE_HEIGHT, HORIZONTAL_SPACING, IS_MOBILE, IS_TABLET, IS_DESKTOP } = layoutValues;
        
        // Clear existing content
        this.svg.selectAll('*').remove();
        
        // Compute centering X - improved centering logic
        let centerX;
        if (IS_MOBILE) {
            centerX = this.dimensions.width / 2;
        } else if (IS_TABLET) {
            centerX = this.dimensions.width / 2;
        } else {
            centerX = this.dimensions.width / 2;
        }
        
        const g = this.svg.append('g')
            .attr('transform', `translate(${centerX},80) scale(${this.zoom})`);
        
        // Center the tree structure itself
        const treeWidth = NODE_WIDTH * 2 + SPOUSE_GAP;
        const treeStartX = -treeWidth / 2;
        
        const allNodes = [];
        const parentChildLinks = [];
        const partnershipLinks = [];
        const sharedChildrenLinks = [];
        
        // Recursively build tree layout
        const buildTree = (node, x = treeStartX, y = 0, depth = 0) => {
            allNodes.push({ ...node, x, y, depth });
            
            // Handle spouses/partners
            node.rawPartners.forEach((p, i) => {
                const px = x + SPOUSE_GAP;
                const py = y;
                const partnerNode = this.processNode(p, depth, 1);
                allNodes.push({ ...partnerNode, x: px, y: py, depth, isPartner: true });
                
                // Partnership link
                const mc = p.marriage_context || {};
                const divorced = mc.is_divorced ?? false;
                const current = mc.is_current ?? true;
                partnershipLinks.push({
                    source: { x, y: y + NODE_HEIGHT / 2 },
                    target: { x: px, y: py + NODE_HEIGHT / 2 },
                    status: divorced ? 'divorced' : current ? 'current' : 'separated'
                });
                
                // Shared children
                if ((p.children || []).length) {
                    const center = (x + px) / 2;
                    const childY = y + NODE_HEIGHT + GENERATION_GAP;
                    
                    // Vertical line down from marriage
                    sharedChildrenLinks.push({
                        source: { x: center, y: y + NODE_HEIGHT / 2 + MARRIAGE_LINE_HEIGHT },
                        target: { x: center, y: childY - 30 }
                    });
                    
                    // Horizontal line connecting children
                    if (p.children.length > 1) {
                        const leftX = center - ((p.children.length - 1) / 2) * (NODE_WIDTH + HORIZONTAL_SPACING);
                        const rightX = center + ((p.children.length - 1) / 2) * (NODE_WIDTH + HORIZONTAL_SPACING);
                        sharedChildrenLinks.push({
                            source: { x: leftX, y: childY - 15 },
                            target: { x: rightX, y: childY - 15 }
                        });
                    }
                    
                    // Individual child connections
                    p.children.forEach((c, ci) => {
                        const cx = center + (ci - (p.children.length - 1) / 2) * (NODE_WIDTH + HORIZONTAL_SPACING);
                        const cy = childY;
                        sharedChildrenLinks.push({
                            source: { x: cx, y: childY - 15 },
                            target: { x: cx, y: cy }
                        });
                        buildTree(this.processNode(c, depth + 1), cx, cy, depth + 1);
                    });
                }
            });
            
            // Individual children (not shared)
            if (node.rawChildren.length) {
                const childY = y + NODE_HEIGHT + GENERATION_GAP;
                node.rawChildren.forEach((c, ci) => {
                    const cx = x + (ci - (node.rawChildren.length - 1) / 2) * (NODE_WIDTH + HORIZONTAL_SPACING);
                    parentChildLinks.push({
                        source: { x, y: y + NODE_HEIGHT },
                        target: { x: cx, y: childY }
                    });
                    buildTree(this.processNode(c, depth + 1), cx, childY, depth + 1);
                });
            }
        };
        
        buildTree(this.processNode(this.initialData));
        
        // Draw parent-child links
        g.selectAll('.link')
            .data(parentChildLinks)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`)
            .attr('fill', 'none')
            .attr('stroke', '#94a3b8')
            .attr('stroke-width', 2);
        
        // Draw partnerships
        g.selectAll('.partnership')
            .data(partnershipLinks)
            .enter()
            .append('path')
            .attr('class', d => `partnership marriage-${d.status}`)
            .attr('d', d => {
                const yMid = d.source.y;
                return `M${d.source.x},${yMid} L${d.target.x},${yMid}`;
            })
            .attr('fill', 'none')
            .attr('stroke', d => d.status === 'divorced' ? '#6b7280' : '#dc2626')
            .attr('stroke-width', d => d.status === 'divorced' ? 2 : 3)
            .attr('stroke-dasharray', d => d.status === 'divorced' ? '5,5' : 'none');
        
        // Draw shared children connectors
        g.selectAll('.shared-children')
            .data(sharedChildrenLinks)
            .enter()
            .append('path')
            .attr('class', 'shared-children')
            .attr('d', d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`)
            .attr('fill', 'none')
            .attr('stroke', '#059669')
            .attr('stroke-width', 2);
        
        // Draw nodes
        const nodes = g.selectAll('.node')
            .data(allNodes)
            .enter()
            .append('foreignObject')
            .attr('class', d => `node ${d.isPartner ? 'partner' : 'primary'}`)
            .attr('x', d => d.x - NODE_WIDTH / 2)
            .attr('y', d => d.y)
            .attr('width', NODE_WIDTH)
            .attr('height', NODE_HEIGHT)
            .on('mouseover', (event, d) => {
                this.showTooltip(event, d);
            })
            .on('mouseout', () => {
                this.hideTooltip();
            })
            .on('click', (event, d) => {
                this.onNodeClick(d);
            });
        
        nodes.html(d => {
            const birthYear = d.dateOfBirth.split?.('-')[0] ?? '';
            const deathYear = d.dateOfDeath.split?.('-')[0] ?? '';
            const avatarInitials = `${d.firstName && d.firstName[0] ? d.firstName[0] : '?'}${d.lastName && d.lastName[0] ? d.lastName[0] : ''}`;
            const isCurrent = d.isCreator;
            const genderClass = d.gender === 'male' ? 'blue' : 'pink';
            
            return `
                <div class="node-card ${isCurrent ? 'current-user' : ''} ${d.isPartner ? 'partner' : ''} ${genderClass}">
                    <div class="avatar-circle ${genderClass}" style="width:${NODE_WIDTH * 0.5}px; height:${NODE_WIDTH * 0.5}px;">
                        <span class="initials" style="font-size:${NODE_WIDTH * 0.15}px;">
                            ${avatarInitials}
                        </span>
                    </div>
                    <div class="node-info" style="font-size:${NODE_WIDTH * 0.14}px;">
                        <div class="name">${d.firstName || 'Unknown'}</div>
                        ${birthYear ? `<div class="birth-year">(${birthYear})</div>` : ''}
                        ${deathYear ? `<div class="death-year">d. ${deathYear}</div>` : ''}
                    </div>
                </div>
            `;
        });
    }
    
    showTooltip(event, d) {
        const name = `${d.firstName || 'Unknown'} ${d.lastName || ''}`.trim();
        const birth = d.dateOfBirth || 'Unknown';
        const death = d.dateOfDeath || 'Present';
        const svgRect = this.svg.node().getBoundingClientRect();
        
        this.tooltip = {
            visible: true,
            content: `${name}\n${birth} – ${death}`,
            x: event.clientX - svgRect.left,
            y: event.clientY - svgRect.top
        };
        
        this.renderTooltip();
    }
    
    hideTooltip() {
        this.tooltip.visible = false;
        this.svg.selectAll('.tooltip').remove();
    }
    
    renderTooltip() {
        if (!this.tooltip.visible) return;
        
        this.svg.selectAll('.tooltip').remove();
        
        const tooltip = this.svg.append('foreignObject')
            .attr('class', 'tooltip')
            .attr('x', Math.min(this.tooltip.x + 10, this.dimensions.width - 160))
            .attr('y', Math.min(this.tooltip.y + 10, this.dimensions.height - 80))
            .attr('width', 150)
            .attr('height', 70);
        
        tooltip.append('xhtml:div')
            .attr('class', 'tooltip-content')
            .style('background', 'white')
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('box-shadow', '0 2px 8px rgba(0,0,0,0.2)')
            .style('font-size', '12px')
            .style('white-space', 'pre-line')
            .text(this.tooltip.content);
    }
}

// Sample data matching the reference image
const sampleData = {
    id: 1,
    first_name: 'User',
    date_of_birth: '1990-01-01',
    gender: 'male',
    is_creator: true,
    partners: [
        {
            id: 2,
            first_name: 'Wife',
            date_of_birth: '1992-01-01',
            gender: 'female',
            marriage_context: {
                is_current: true,
                is_divorced: false
            },
            children: [
                {
                    id: 3,
                    first_name: 'Child',
                    gender: 'other'
                },
                {
                    id: 4,
                    first_name: 'Child',
                    gender: 'other'
                }
            ]
        }
    ],
    children: []
};

// Initialize the family tree when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const familyTree = new FamilyTreeComponent('org-tree-root', sampleData, {
        zoom: 0.8,
        onNodeClick: (node) => {
            console.log('Node clicked:', node);
        }
    });
});
