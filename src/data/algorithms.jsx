export const algorithmsData = {
  bfs: {
    name: "Breadth-First Search",

    description: `
<span class="font-semibold text-accent">Breadth-First Search (BFS)</span> is a graph traversal algorithm that explores nodes level by level, starting from a chosen source node. Instead of diving deep into a single path, it first visits all immediate neighbors before moving outward. This makes BFS very effective for finding the <span class="text-primary font-semibold">shortest path</span> in unweighted graphs. It relies on a <span class="text-accent font-semibold">queue</span> to manage the order of traversal.
    `,

    code: `
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();

    if (!visited.has(node)) {
      visited.add(node);

      for (const neighbor of graph[node]) {
        queue.push(neighbor);
      }
    }
  }
}
    `
  },

  dfs: {
    name: "Depth-First Search",

    description: `
<span class="font-semibold text-accent">Depth-First Search (DFS)</span> is a traversal algorithm that explores a graph by going as deep as possible along each branch before backtracking. Starting from a node, it follows one path until it cannot continue, then returns to explore other paths. This approach is typically implemented using <span class="text-primary font-semibold">recursion</span> or a stack. DFS is useful for problems like <span class="text-accent font-semibold">cycle detection</span>, pathfinding, and topological sorting.
    `,

    code: `
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;

  visited.add(node);

  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}
    `
  },

  dijkstra: {
    name: "Dijkstra's Algorithm",

    description: `
<span class="font-semibold text-accent">Dijkstra's Algorithm</span> is used to find the shortest path between nodes in a weighted graph where all edge weights are positive. It works by always selecting the node with the smallest known distance and updating its neighbors accordingly. Over time, it builds the most efficient paths from the starting node to all others. This algorithm is widely used in systems like <span class="text-primary font-semibold">navigation</span> and network routing because it guarantees optimal paths.
    `,

    code: `
function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();

  for (let node in graph) {
    dist[node] = Infinity;
  }

  dist[start] = 0;

  const pq = [{ node: start, dist: 0 }];

  while (pq.length) {
    pq.sort((a, b) => a.dist - b.dist);
    const { node } = pq.shift();

    if (visited.has(node)) continue;
    visited.add(node);

    for (const { node: neighbor, weight } of graph[node]) {
      const newDist = dist[node] + weight;

      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.push({ node: neighbor, dist: newDist });
      }
    }
  }
}
    `
  }
};