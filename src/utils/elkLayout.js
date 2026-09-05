// utils/elkLayout.js
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'DOWN',
  'elk.layered.spacing.nodeNodeBetweenLayers': '80',
  'elk.spacing.nodeNode': '60',
  'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
};

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

export async function getLayoutedElements(nodes, edges) {
  const graph = {
    id: 'root',
    layoutOptions: elkOptions,
    children: nodes.map((n) => ({
      id: n.id,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    })),
    edges: edges.map((e, i) => ({
      id: `edge-${i}`,
      sources: [e.source],
      targets: [e.target],
    })),
  };

  const layout = await elk.layout(graph);

  const positionedNodes = nodes.map((n) => {
    const laidOut = layout.children.find((c) => c.id === n.id);
    return {
      ...n,
      position: { x: laidOut?.x ?? 0, y: laidOut?.y ?? 0 },
    };
  });

  return { nodes: positionedNodes, edges };
}