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
    
    // Center the entire layout horizontally by centering on the start node
    const startX = pos['start']?.x || 0;
    Object.keys(pos).forEach(id => {
      pos[id].x = pos[id].x - startX;
    });
    
    // Recompute bounds after centering (start should now be at x=0)
    const centeredXs = Object.values(pos).map(p => p.x);
    const newMinX = Math.min(...centeredXs);
    const newMaxX = Math.max(...centeredXs);
    
    // Ensure symmetric margins for proper centering
    const maxAbsX = Math.max(Math.abs(newMinX), Math.abs(newMaxX));
    const marginX = Math.max(200, maxAbsX + 100); // Ensure enough space on both sides
    const marginY = 50; // Further reduced to minimize bottom space
    const stageWidth = maxAbsX * 2 + marginX * 2; // Symmetric width centered on 0
    const stageHeight = (maxY + NODE_R) + marginY;
    
    return { pos, minX: newMinX, maxX: newMaxX, maxY, stageWidth, stageHeight, marginX, NODE_R };
  };

  // Safely compute layout with error handling
  let layout = null;
  try {
    layout = computeLayout();
  } catch (error) {
    console.error('Error computing layout:', error);
    return (
      <div className="simple-timeline">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error)' }}>
          Error rendering timeline: {error.message}
        </div>
      </div>
    );
  }

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
    if (!storyData?.edges || !Array.isArray(storyData.edges)) return null;
    if (!layout || !layout.pos) return null;
    const { pos, stageWidth, stageHeight, NODE_R } = layout;
    const edges = storyData.edges;
    
    // Shift left by 20%: position at 30% from left edge (50% - 20% = 30%)
    const stageCenterX = stageWidth * 0.3;
    
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
      
        {/* --- Optional short amber spine (Start → DataHall) --- */}
        {(() => {
          const firstMain = edges.find((e) => (e.kind ?? "main") === "main" && e.from === "start");
          if (!firstMain) return null;
          const a = pos[firstMain.from],
            b = pos[firstMain.to];
          if (!a || !b) return null;
          // Start is centered at x=0, so spineX should be at stage center
          const spineX = stageCenterX;
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
      
          // Use centered coordinates
          const sx = stageCenterX + A.x,
            sy = A.y + NODE_R;
          const tx = stageCenterX + B.x,
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
        {storyData?.nodes?.map((node, index) => {
          if (!node || !node.id) return null;
          const p = layout.pos[node.id];
          if (!p) return null;
          
          // Shift left by 20%: position at 30% from left edge (50% - 20% = 30%)
          const stageCenterX = layout.stageWidth * 0.3;
          const x = stageCenterX + p.x;
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
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            marginTop: '0.5rem',
            position: 'relative',
            overflow: 'hidden',
            padding: '2.5rem',
            minHeight: '280px'
          }}
        >
          {/* Animated background gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: selectedNode.type === 'ending' 
              ? 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(5, 150, 105, 0.06) 0%, transparent 50%)'
              : selectedNode.type === 'choice'
              ? 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 50%, rgba(138, 43, 226, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(106, 27, 154, 0.06) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />
          
          {/* Decorative top gradient bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: selectedNode.type === 'ending' 
              ? 'linear-gradient(90deg, #10b981, #34d399, #059669, #10b981)'
              : selectedNode.type === 'choice'
              ? 'linear-gradient(90deg, #3b82f6, #60a5fa, #2563eb, #3b82f6)'
              : 'linear-gradient(90deg, #8a2be2, #a78bfa, #6a1b9a, #8a2be2)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
            boxShadow: selectedNode.type === 'ending' 
              ? '0 2px 8px rgba(16, 185, 129, 0.4)'
              : selectedNode.type === 'choice'
              ? '0 2px 8px rgba(59, 130, 246, 0.4)'
              : '0 2px 8px rgba(138, 43, 226, 0.4)'
          }} />
          
          {/* Close button */}
          <motion.button
            onClick={() => setSelectedNode(null)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(138, 43, 226, 0.12)',
              border: '1.5px solid rgba(138, 43, 226, 0.25)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--accent)',
              fontSize: '20px',
              lineHeight: 1,
              transition: 'all 0.3s ease',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(138, 43, 226, 0.2)'
            }}
          >
            ×
          </motion.button>
          
          {/* Content wrapper */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Title */}
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                marginTop: 0,
                marginBottom: '1.25rem',
                paddingRight: '3rem',
                background: selectedNode.type === 'ending' 
                  ? 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7)'
                  : selectedNode.type === 'choice'
                  ? 'linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd)'
                  : 'linear-gradient(135deg, #8a2be2, #a78bfa, #c4b5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '2rem',
                fontWeight: '800',
                letterSpacing: '0.02em',
                lineHeight: '1.2',
                textShadow: '0 0 30px rgba(138, 43, 226, 0.3)',
                fontFamily: "'Iceberg', sans-serif"
              }}
            >
              {selectedNode.title}
            </motion.h3>
            
            {/* Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                display: 'flex',
                gap: '0.875rem',
                marginBottom: '1.75rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{
                padding: '0.5rem 1rem',
                background: selectedNode.type === 'ending' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))'
                  : selectedNode.type === 'choice'
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))'
                  : 'linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(106, 27, 154, 0.15))',
                border: `1.5px solid ${selectedNode.type === 'ending' 
                  ? 'rgba(16, 185, 129, 0.4)'
                  : selectedNode.type === 'choice'
                  ? 'rgba(59, 130, 246, 0.4)'
                  : 'rgba(138, 43, 226, 0.4)'}`,
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: selectedNode.type === 'ending' 
                  ? '#10b981'
                  : selectedNode.type === 'choice'
                  ? '#3b82f6'
                  : '#c084fc',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: selectedNode.type === 'ending' 
                  ? '0 2px 8px rgba(16, 185, 129, 0.2)'
                  : selectedNode.type === 'choice'
                  ? '0 2px 8px rgba(59, 130, 246, 0.2)'
                  : '0 2px 8px rgba(138, 43, 226, 0.2)'
              }}>
                {selectedNode.type}
              </span>
              {selectedNode.act && (
                <span style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.15))',
                  border: '1.5px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#f59e0b',
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)'
                }}>
                  Act {selectedNode.act}
                </span>
              )}
            </motion.div>
            
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                margin: 0,
                lineHeight: '1.85',
                fontSize: '1.05rem',
                color: 'var(--ink)',
                padding: '1.5rem',
                background: selectedNode.type === 'ending' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.05))'
                  : selectedNode.type === 'choice'
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.05))'
                  : 'linear-gradient(135deg, rgba(138, 43, 226, 0.08), rgba(106, 27, 154, 0.05))',
                borderRadius: '14px',
                border: `1.5px solid ${selectedNode.type === 'ending' 
                  ? 'rgba(16, 185, 129, 0.15)'
                  : selectedNode.type === 'choice'
                  ? 'rgba(59, 130, 246, 0.15)'
                  : 'rgba(138, 43, 226, 0.15)'}`,
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
            >
              {/* Decorative corner accent */}
              <div style={{
                position: 'absolute',
                top: '-1px',
                left: '-1px',
                width: '20px',
                height: '20px',
                borderTop: `2px solid ${selectedNode.type === 'ending' 
                  ? 'rgba(16, 185, 129, 0.4)'
                  : selectedNode.type === 'choice'
                  ? 'rgba(59, 130, 246, 0.4)'
                  : 'rgba(138, 43, 226, 0.4)'}`,
                borderLeft: `2px solid ${selectedNode.type === 'ending' 
                  ? 'rgba(16, 185, 129, 0.4)'
                  : selectedNode.type === 'choice'
                  ? 'rgba(59, 130, 246, 0.4)'
                  : 'rgba(138, 43, 226, 0.4)'}`,
                borderTopLeftRadius: '14px'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '20px',
                height: '20px',
                borderBottom: `2px solid ${selectedNode.type === 'ending' 
                  ? 'rgba(16, 185, 129, 0.4)'
                  : selectedNode.type === 'choice'
                  ? 'rgba(59, 130, 246, 0.4)'
                  : 'rgba(138, 43, 226, 0.4)'}`,
                borderRight: `2px solid ${selectedNode.type === 'ending' 
                  ? 'rgba(16, 185, 129, 0.4)'
                  : selectedNode.type === 'choice'
                  ? 'rgba(59, 130, 246, 0.4)'
                  : 'rgba(138, 43, 226, 0.4)'}`,
                borderBottomRightRadius: '14px'
              }} />
              <p style={{ margin: 0, position: 'relative', zIndex: 1 }}>
                {selectedNode.summary}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};


export default StoryTimeline;
