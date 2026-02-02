export function dijkstra(nodes, edges, startId) {

 const steps = [];
  const neighborList = buildNeighborList(edges);
  const dist = {};
  const visited = new Set();


  nodes.forEach( node => {
    dist[node.id] = Infinity
  })
  dist[startId] = 0;


  //Build a list of neighbor relationships
  edges.forEach( edge => {
    const w = edge.data?.weight ?? 1;

    neighborList[edge.source] ??= []
    neighborList[edge.target] ??= []

    neighborList[edge.source].push({ node: edge.target, weight: w})
    neighborList[edge.target].push({ node: edge.source, weight: w})
  });

  //Priority Queue
  const pq = [{ node: startId, dist: 0}];

  while (pq.length){

    pq.sort( (a, b) => a.dist - b.dist) //Sorting to simulate a min-heap                                     // 
    const { node: current } = pq.shift() //popping the first element off the sorted array

    if (visited.has(current)) continue;
    visited.add(current);

    //record visited node
    steps.push({
      type: 'visit-node',
      id: current,
      dist: dist[current],
    });

    for (const { node: neighbor, weight } of neighborList[current] || []){
    if (visited.has(neighbor)) continue;

    const newDist = dist[current] + weight

    if(newDist < dist[neighbor]){
      dist[neighbor] = newDist;

      //record edge relaxation
      steps.push({
        type: 'relax-edge',
        from: current,
        to: neighbor,
        weight,
        newDist,
      });

      pq.push({ node: neighbor, dist: newDist })
    }
  }
  }

  

  return steps
}

//Neighborlist builder for Dijsktras Algorithm
function buildNeighborList(edges){
  const neighborList = {} 

  for (const {source, target, weight} of edges){
    if(!neighborList[source])  neighborList[source] = []
    if(!neighborList[target]) neighborList[target] = []

    neighborList[source].push({ node: target, weight })
    neighborList[target].push({ node: source, weight})
  }

  return neighborList
}