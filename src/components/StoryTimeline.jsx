import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Compute vertical positions for nodes in a branching tree
const computeVerticalPositions = (nodes, edges, { startId, vSpace = 180, hSpace = 280 }) => {
  const pos = {};
  const parents = {};
  
  // Build adjacency lists
  const children = {};
  edges.forEach(edge => {
    if (!children[edge.from]) children[edge.from] = [];
    children[edge.from].push(edge.to);
    if (!parents[edge.to]) parents[edge.to] = [];
    parents[edge.to].push(edge.from);
  });
  
  // BFS to assign levels, properly handling cycles
  const queue = [{ id: startId, level: 0, x: 0 }];
  const levels = {};
  const visited = new Set();
  
  while (queue.length > 0) {
    const { id, level, x } = queue.shift();
    
    if (visited.has(id)) continue;
    visited.add(id);
    
    if (!levels[level]) levels[level] = [];
    levels[level].push({ id, x });
    
    const kids = children[id] || [];
    if (kids.length > 0) {
      const totalWidth = (kids.length - 1) * hSpace;
      const startX = x - totalWidth / 2;
      
      kids.forEach((childId, i) => {
        if (!visited.has(childId)) {
          queue.push({
            id: childId,
            level: level + 1,
            x: startX + i * hSpace
          });
        }
      });
    }
  }
  
  // Assign y-coordinates based on level
  Object.entries(levels).forEach(([level, nodesInLevel]) => {
    const y = 80 + parseInt(level) * vSpace;
    nodesInLevel.forEach(({ id, x }) => {
      pos[id] = { x, y };
    });
  });
  
  // Handle any unvisited nodes (disconnected components)
  nodes.forEach(node => {
    if (!pos[node.id]) {
      pos[node.id] = { x: 0, y: 800 + Math.random() * 200 };
    }
  });
  
  return pos;
};

// Spread sibling nodes horizontally to avoid overlap
const spreadSiblings = (nodes, edges, pos, hSpace) => {
  // Group nodes by y-coordinate (siblings on same row)
  const rows = {};
  Object.entries(pos).forEach(([id, p]) => {
    if (!rows[p.y]) rows[p.y] = [];
    rows[p.y].push({ id, x: p.x });
  });
  
  // Sort and spread each row
  Object.values(rows).forEach(row => {
    if (row.length <= 1) return;
    row.sort((a, b) => a.x - b.x);
    const totalWidth = (row.length - 1) * hSpace;
    const centerX = row.reduce((sum, n) => sum + n.x, 0) / row.length;
    const startX = centerX - totalWidth / 2;
    row.forEach((node, i) => {
      pos[node.id].x = startX + i * hSpace;
    });
  });
};

/**
 * Story Timeline - Reads from story.echoes.json
 */
const StoryTimeline = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nodeRadius, setNodeRadius] = useState(30); // default (half of 60px height)
  const nodeRef = useRef(null);

  // Fetch story data
  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch('/data/story.echoes.json');
        const data = await response.json();
        setStoryData(data);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching story data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, []);

  // Measure node size after first render
  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const r = Math.min(rect.width, rect.height) / 2;
      setNodeRadius(r);
    }
  }, [storyData]);

  // Use algorithmic positioning with increased spacing
  const computeLayout = () => {
    if (!storyData?.nodes || !storyData?.edges) return null;
    
    const NODE_R = nodeRadius || 30;
    const vSpace = 180; // Increased from 140
    const hSpace = 280; // Increased from 220
    
    // Use algorithmic positioning
    const pos = computeVerticalPositions(
      storyData.nodes,
      storyData.edges,
      { startId: 'start', vSpace, hSpace }
    );
    
    spreadSiblings(storyData.nodes, storyData.edges, pos, hSpace);
    
    // Compute stage bounds
    const xs = Object.values(pos).map(p => p.x);
    const ys = Object.values(pos).map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    
    // Center the entire layout horizontally
    const centerX = (minX + maxX) / 2;
    Object.keys(pos).forEach(id => {
      pos[id].x = pos[id].x - centerX;
    });
    
    // Recompute bounds after centering
    const centeredXs = Object.values(pos).map(p => p.x);
    const newMinX = Math.min(...centeredXs);
    const newMaxX = Math.max(...centeredXs);
    
    const marginX = 200;
    const marginY = 100; // Reduced from 300 to minimize bottom space
    const stageWidth = (newMaxX - newMinX) + marginX * 2;
    const stageHeight = (maxY + NODE_R) + marginY;
    
    return { pos, minX: newMinX, maxX: newMaxX, maxY, stageWidth, stageHeight, marginX, NODE_R };
  };

  const layout = computeLayout();
  if (!layout) {
    if (loading) {
      return (
        <div className="simple-timeline">
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
            Loading story timeline...
          </div>
        </div>
      );
    }
    
    return (
      <div className="simple-timeline">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error)' }}>
          Failed to load story data
        </div>
      </div>
    );
  }

  // Get node styling based on type
  const getNodeStyle = (type, isSelected = false, isHovered = false) => {
    const baseStyle = {
      width: '120px',
      height: '60px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '12px',
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
      margin: '0 auto',
      transform: isSelected ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)',
      padding: '8px 12px',
      wordWrap: 'break-word',
      lineHeight: '1.2',
    };

    switch (type) {
      case 'beat':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #8a2be2, #6a1b9a)',
          boxShadow: isSelected ? '0 0 25px rgba(138, 43, 226, 0.8)' : '0 0 20px rgba(138, 43, 226, 0.5)',
          border: '2px solid rgba(138, 43, 226, 0.3)'
        };
      case 'choice':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          boxShadow: isSelected ? '0 0 25px rgba(59, 130, 246, 0.8)' : '0 0 15px rgba(59, 130, 246, 0.4)',
          border: '2px solid rgba(59, 130, 246, 0.4)',
          position: 'relative'
        };
      case 'ending':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #10b981, #047857)',
          boxShadow: isSelected ? '0 0 25px rgba(16, 185, 129, 0.8)' : '0 0 15px rgba(16, 185, 129, 0.4)',
          border: '2px solid rgba(16, 185, 129, 0.4)'
        };
      default:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          boxShadow: isSelected ? '0 0 25px rgba(245, 158, 11, 0.8)' : '0 0 15px rgba(245, 158, 11, 0.4)',
          border: '2px solid rgba(245, 158, 11, 0.4)'
        };
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'beat': return '●';
      case 'choice': return '?';
      case 'ending': return '✓';
      default: return '●';
    }
  };

  // Generate SVG connectors based on edges
  const renderConnectors = (layout) => {
    if (!storyData?.edges) return null;
    const { pos, minX, stageWidth, stageHeight, marginX, NODE_R } = layout;
    const edges = storyData.edges;
    
    return (
        <svg
        className="timeline-svg"
        width={stageWidth}
        height={stageHeight}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {/* --- Define reusable arrowheads --- */}
        <defs>
          {/* Amber chevron for main edges */}
          <marker
            id="arrow-main"
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            markerUnits="strokeWidth"
            orient="auto"
          >
            <path
              d="M 0 2 L 10 6 L 0 10"
              fill="none"
              stroke="rgba(245,158,11,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
      
          {/* Muted chevron for dashed/branch edges */}
          <marker
            id="arrow-muted"
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            markerUnits="strokeWidth"
            orient="auto"
          >
            <path
              d="M 0 2 L 10 6 L 0 10"
              fill="none"
              stroke="rgba(148,163,184,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
      
        {/* --- Optional short amber spine (Awakening → First Fork) --- */}
        {(() => {
          const firstMain = edges.find((e) => (e.kind ?? "main") === "main");
          if (!firstMain) return null;
          const a = pos[firstMain.from],
            b = pos[firstMain.to];
          const spineX = (0 - minX) + marginX;
          const topY = Math.min(a.y, b.y) + NODE_R;
          const botY = Math.max(a.y, b.y) - NODE_R;
          return (
            <line
              x1={spineX}
              y1={topY}
              x2={spineX}
              y2={botY}
              stroke="rgba(245,158,11,0.9)"
              strokeWidth="2"
            />
          );
        })()}
      
        {/* --- All path connectors --- */}
        {edges.map((e, i) => {
          const A = pos[e.from],
            B = pos[e.to];
          if (!A || !B) return null;
      
          const sx = (A.x - minX) + marginX,
            sy = A.y + NODE_R;
          const tx = (B.x - minX) + marginX,
            ty = B.y - NODE_R;
          const dy = (ty - sy) * 0.5;
          const d = `M ${sx},${sy} C ${sx},${sy + dy} ${tx},${ty - dy} ${tx},${ty}`;
      
          const isMain = (e.kind ?? "main") === "main";
      
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={isMain ? "rgba(245,158,11,0.9)" : "rgba(148,163,184,0.5)"}
              strokeWidth={2.5}
              strokeDasharray={isMain ? undefined : "4 6"}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              markerEnd={`url(#${isMain ? "arrow-main" : "arrow-muted"})`}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="timeline-container">
      {/* Flow Legend */}
      <div className="flow-legend" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: 'var(--muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '30px', height: '3px', background: 'rgba(245,158,11,0.9)', borderRadius: '2px' }}></div>
          <span>Main Story Path</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '30px', height: '2px', background: 'rgba(148,163,184,0.7)', border: 'dashed 1px rgba(148,163,184,0.7)', borderRadius: '2px' }}></div>
          <span>Player Choices</span>
        </div>
      </div>

      <div
        className="timeline-stage"
        style={{
          position: 'relative',
          width: `${layout.stageWidth}px`,
          height: `${layout.stageHeight}px`,
          margin: '0 auto',
          padding: '40px 0'
        }}
      >
        {/* Dynamic SVG connectors */}
        {renderConnectors(layout)}

        {/* Dynamic Nodes from JSON */}
        {storyData.nodes.map((node, index) => {
          const p = layout.pos[node.id];
          if (!p) return null;
          
          const x = (p.x - layout.minX) + layout.marginX;
          const y = p.y;
          
          return (
            <div
              key={node.id}
              ref={index === 0 ? nodeRef : null}
              className="story-node"
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            >
               <motion.div
                 className="timeline-node"
                 style={getNodeStyle(node.type)}
                 onClick={() => setSelectedNode(node)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 }}
               >
                 {node.title}
                 {node.type === 'choice' && (
                   <div style={{
                     position: 'absolute',
                     top: '-8px',
                     right: '-8px',
                     width: '16px',
                     height: '16px',
                     background: 'rgba(59, 130, 246, 0.9)',
                     borderRadius: '50%',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     fontSize: '10px',
                     color: 'white',
                     fontWeight: 'bold'
                   }}>
                     ?
                   </div>
                 )}
               </motion.div>
            </div>
          );
        })}
      </div>

      {/* Selected node details panel */}
      {selectedNode && (
        <motion.div
          className="story-node-detail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h3>{selectedNode.title}</h3>
          <p className="node-type">Type: {selectedNode.type}</p>
          <p className="node-description">{selectedNode.summary}</p>
          {selectedNode.act && <p className="node-act">Act: {selectedNode.act}</p>}
        </motion.div>
      )}
    </div>
  );
};


export default StoryTimeline;
