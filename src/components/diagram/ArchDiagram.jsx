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
import ExplainMode from './ExplainMode';
import RequestSimulator from './RequestSimulator';
import FailureSimulator from './FailureSimulator';
import SimulationToolbar from './SimulationToolbar'
const nodeTypes = { archNode: ArchNode };

export default function ArchitectureDiagram({ architecture }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('intermediate');

  const [simState, setSimState] = useState({ activeNodeId: null, activeEdgeId: null, failedNodeId: null, impactedIds: [] });

  const rawNodes = useMemo(() => architecture.nodes.map((n) => ({ id: n.id, type: 'archNode', data: { ...n } })), [architecture.nodes]);
  const rawEdges = useMemo(() => architecture.edges.map((e, i) => ({
    id: `edge-${i}`, source: e.source, target: e.target, label: e.label,
    animated: e.communication === 'asynchronous',
    style: { stroke: e.communication === 'asynchronous' ? '#f59e0b' : '#94a3b8' },
    data: { ...e },
  })), [architecture.edges]);

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

  // Apply highlight state to nodes/edges whenever simulation state changes
  useEffect(() => {
    setNodes((nds) => nds.map((n) => {
      let highlightState;
      if (n.id === simState.failedNodeId) highlightState = 'failed';
      else if (simState.impactedIds.includes(n.id)) highlightState = 'impacted';
      else if (n.id === simState.activeNodeId) highlightState = 'active';
      return { ...n, data: { ...n.data, highlightState } };
    }));

    setEdges((eds) => eds.map((e) => ({
      ...e,
      style: {
        ...e.style,
        stroke: e.id === simState.activeEdgeId ? '#4f46e5' : (e.data.communication === 'asynchronous' ? '#f59e0b' : '#94a3b8'),
        strokeWidth: e.id === simState.activeEdgeId ? 3 : 1.5,
      },
    })));
  }, [simState]); // eslint-disable-line react-hooks/exhaustive-deps

  const rawNodeList = architecture.nodes;
  const rawEdgeList = architecture.edges;

  const handleRequestStep = useCallback(({ node, edge }) => {
    const edgeId = edge ? rawEdges.find((e) => e.data.source === edge.source && e.data.target === edge.target)?.id : null;
    setSimState({ activeNodeId: node.id, activeEdgeId: edgeId, failedNodeId: null, impactedIds: [] });
  }, [rawEdges]);

  const handleRequestStop = useCallback(() => {
    setSimState({ activeNodeId: null, activeEdgeId: null, failedNodeId: null, impactedIds: [] });
  }, []);

  const handleFailureSimulate = useCallback((failedNodeId, impactedIds) => {
    setSimState({ activeNodeId: null, activeEdgeId: null, failedNodeId, impactedIds });
  }, []);

  const handleFailureClear = useCallback(() => {
    setSimState({ activeNodeId: null, activeEdgeId: null, failedNodeId: null, impactedIds: [] });
  }, []);

  const onNodeClick = useCallback((_, node) => { setSelectedEdge(null); setSelectedNode(node.data); }, []);
  const onEdgeClick = useCallback((_, edge) => { setSelectedNode(null); setSelectedEdge(edge.data); }, []);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Laying out architecture…</div>;
  }
  
  return (
        <div style={{width:'100%'}}>
     <SimulationToolbar
  nodes={rawNodeList}
  edges={rawEdgeList}
  mode={mode}
  onModeChange={setMode}
  onRequestStep={handleRequestStep}
  onRequestStop={handleRequestStop}
  onFailureSimulate={handleFailureSimulate}
  onFailureClear={handleFailureClear}
/>

    <div style={{ position: 'relative', width: '100%', height: '600px' }} className="neu-inset">
      {/* <ExplainMode mode={mode} onChange={setMode} /> */}
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
      {selectedNode && <NodeDetailsPanel node={selectedNode} mode={mode} onClose={() => setSelectedNode(null)} />}
    </div>
    </div>

  );
}