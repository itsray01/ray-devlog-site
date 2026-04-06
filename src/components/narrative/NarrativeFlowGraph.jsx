import { useMemo, useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import CyberNode from './CyberNode';
import narrativeData from '../../../data/narrativeGraph.json';

const SIZES = {
  TB: { w: 240, h: 100, nodesep: 100, ranksep: 140 },
  LR: { w: 310, h: 140, nodesep: 50,  ranksep: 160 },
};

const nodeTypes = { cyberNode: CyberNode };

const CATEGORY_COLORS = {
  start:  '#00e5ff',
  branch: '#bf5af2',
  ending: '#ff453a',
  path:   '#a78bfa',
};

function buildGraph(data, direction = 'TB') {
  const sz = SIZES[direction] || SIZES.TB;

  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: direction,
    nodesep: sz.nodesep,
    ranksep: sz.ranksep,
    marginx: 40,
    marginy: 40,
  });

  const nodes = [];
  const edges = [];

  data.passages.forEach((p) => {
    g.setNode(p.name, { width: sz.w, height: sz.h });

    nodes.push({
      id: p.name,
      type: 'cyberNode',
      data: {
        label: p.name,
        pid: p.pid,
        category: p.category,
        subtitle: p.subtitle,
        direction,
      },
      position: { x: 0, y: 0 },
    });

    p.links.forEach((link, i) => {
      const isRestart = p.category === 'ending' && link.target === data.startNode;

      if (!isRestart) {
        g.setEdge(p.name, link.target);
      }

      edges.push({
        id: `${p.name}->${link.target}-${i}`,
        source: p.name,
        target: link.target,
        label: link.label,
        type: isRestart ? 'default' : 'smoothstep',
        animated: false,
        markerEnd: { type: MarkerType.ArrowClosed, color: isRestart ? '#ff453a55' : '#a78bfa' },
        style: isRestart
          ? { stroke: '#ff453a55', strokeWidth: 1.5, strokeDasharray: '6 4' }
          : { stroke: '#a78bfa', strokeWidth: 2 },
        labelStyle: { fill: '#94a3b8', fontSize: direction === 'LR' ? 13 : 11, fontFamily: 'Rajdhani, sans-serif' },
        labelBgStyle: { fill: '#0a0e27', fillOpacity: 0.85 },
        labelBgPadding: [6, 3],
        data: { isRestart },
      });
    });
  });

  dagre.layout(g);

  const layoutNodes = nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x - sz.w / 2,
        y: pos.y - sz.h / 2,
      },
    };
  });

  return { nodes: layoutNodes, edges };
}

/**
 * @param {{ direction?: 'TB' | 'LR' }} props
 *   TB = top-to-bottom (default, used on Timeline page)
 *   LR = left-to-right  (fullscreen overlay on Home)
 */
const NarrativeFlowGraph = ({ direction = 'TB' }) => {
  const isLR = direction === 'LR';
  const [locked, setLocked] = useState(true);
  const [fading, setFading] = useState(false);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [hintFading, setHintFading] = useState(false);

  const { nodes: initNodes, edges: initEdges } = useMemo(
    () => buildGraph(narrativeData, direction),
    [direction]
  );

  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  const onInit = useCallback((instance) => {
    setTimeout(() => {
      instance.fitView({ padding: 0.08 });
      if (isLR) {
        const { y, zoom } = instance.getViewport();
        instance.setViewport({ x: 30, y, zoom });
      }
    }, 50);
  }, [isLR]);

  const handleUnlock = () => {
    setFading(true);
    setTimeout(() => {
      setLocked(false);
      setTimeout(() => {
        setShowZoomHint(true);
        setTimeout(() => {
          setHintFading(true);
          setTimeout(() => setShowZoomHint(false), 600);
        }, 3000);
      }, 5000);
    }, 400);
  };

  const zoomMin = isLR ? 0.55 : 0.2;

  return (
    <div style={{ position: 'relative' }}>
      <div className={`narrative-flow-wrapper${isLR ? ' narrative-flow-wrapper--lr' : ''}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={onInit}
          nodeTypes={nodeTypes}
          fitView
          minZoom={zoomMin}
          maxZoom={2.5}
          nodesDraggable={false}
          panOnDrag={!locked}
          zoomOnScroll={!locked}
          zoomOnPinch={!locked}
          nodesConnectable={false}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1a1f3e" gap={20} size={1} variant="dots" />
          <Controls
            showInteractive={false}
            className="narrative-controls"
          />
          <MiniMap
            nodeColor={(n) => CATEGORY_COLORS[n.data?.category] || '#a78bfa'}
            maskColor="rgba(10,14,39,0.85)"
            style={{ backgroundColor: '#0d1117', border: '1px solid rgba(167,139,250,0.2)' }}
          />
        </ReactFlow>
      </div>

      {locked && (
        <div
          onClick={handleUnlock}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            background: 'rgba(10, 14, 39, 0.45)',
            cursor: 'pointer',
            borderRadius: '8px',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.4s ease',
            zIndex: 10,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 9l7-7 7 7" />
            <path d="M5 15l7 7 7-7" />
            <circle cx="12" cy="12" r="1.5" fill="rgba(167,139,250,0.9)" stroke="none" />
          </svg>
          <span style={{
            color: 'rgba(167,139,250,0.95)',
            fontSize: '0.85rem',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Click to explore
          </span>
          <span style={{
            color: 'rgba(148,163,184,0.6)',
            fontSize: '0.72rem',
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Drag · Scroll to zoom
          </span>
        </div>
      )}

      {showZoomHint && (
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(10, 14, 39, 0.85)',
          border: '1px solid rgba(167,139,250,0.3)',
          borderRadius: '999px',
          padding: '0.5rem 1.1rem',
          pointerEvents: 'none',
          opacity: hintFading ? 0 : 1,
          transition: 'opacity 0.6s ease',
          zIndex: 9,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span style={{
            color: 'rgba(167,139,250,0.9)',
            fontSize: '0.75rem',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            Scroll to zoom in
          </span>
        </div>
      )}
    </div>
  );
};

export default NarrativeFlowGraph;
