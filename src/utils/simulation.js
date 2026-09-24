// Builds a step-by-step request path via DFS from the client node
export function buildRequestPath(nodes, edges) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const adjacency = {};
  edges.forEach((e) => {
    if (!adjacency[e.source]) adjacency[e.source] = [];
    adjacency[e.source].push(e);
  });

  const start = nodes.find((n) => n.type === 'client') || nodes[0];
  if (!start) return [];

  const visited = new Set();
  const path = [];

  function dfs(nodeId, incomingEdge) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    path.push({ node: nodeMap[nodeId], edge: incomingEdge || null });
    (adjacency[nodeId] || []).forEach((e) => dfs(e.target, e));
  }

  dfs(start.id, null);
  return path;
}

// Finds every node connected (either direction) to the failed node —
// the "blast radius" of a single component going down
export function getFailureImpact(failedNodeId, nodes, edges) {
  const adjacency = {};
  edges.forEach((e) => {
    if (!adjacency[e.source]) adjacency[e.source] = [];
    if (!adjacency[e.target]) adjacency[e.target] = [];
    adjacency[e.source].push(e.target);
    adjacency[e.target].push(e.source);
  });

  const visited = new Set([failedNodeId]);
  const queue = [failedNodeId];
  const impacted = [];

  while (queue.length) {
    const current = queue.shift();
    (adjacency[current] || []).forEach((neighborId) => {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        impacted.push(neighborId);
        queue.push(neighborId);
      }
    });
  }

  return impacted;
}