// components/diagram/ArchitectureDiagram.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Background, Controls, MiniMap, useNodesState, useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '../../utils/elkLayout';
import ArchNode from './ArchNode';
import NodeDetailsPanel from './NodeDetailsPanel';
import EdgeDetailsPanel from './EdgeDetailsPanel';

const nodeTypes = { archNode: ArchNode };

export default function ArchitectureDiagram({ architecture }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [loading, setLoading] = useState(true);

  const rawNodes = useMemo(
    () =>
      architecture.nodes.map((n) => ({
        id: n.id,
        type: 'archNode',
        data: { ...n },
      })),
    [architecture.nodes]
  );

  const rawEdges = useMemo(
    () =>
      architecture.edges.map((e, i) => ({
        id: `edge-${i}`,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: e.communication === 'asynchronous',
        style: { stroke: e.communication === 'asynchronous' ? '#f59e0b' : '#94a3b8' },
        data: { ...e },
      })),
    [architecture.edges]
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getLayoutedElements(rawNodes, rawEdges).then(({ nodes: laidOutNodes }) => {
      if (cancelled) return;
      setNodes(laidOutNodes);
      setEdges(rawEdges);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [rawNodes, rawEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_, node) => {
    setSelectedEdge(null);
    setSelectedNode(node.data);
  }, []);

  const onEdgeClick = useCallback((_, edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge.data);
  }, []);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Laying out architecture…</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }} className="neu-inset">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} color="#c8d0dc" />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>

      {selectedNode && (
        <NodeDetailsPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
      {selectedEdge && (
        <EdgeDetailsPanel edge={selectedEdge} onClose={() => setSelectedEdge(null)} />
      )}
    </div>
  );
}