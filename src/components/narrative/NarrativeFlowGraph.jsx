import { useMemo, useCallback } from 'react';
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

  const zoomMin = isLR ? 0.55 : 0.2;

  return (
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
  );
};

export default NarrativeFlowGraph;
