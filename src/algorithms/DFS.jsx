export function dfs(nodes, edges, startId) {
     const visited = new Set();
  const steps = [];
  const neighborList = [];

  edges.forEach(edge => {
    neighborList[edge.source] ??= [];
    neighborList[edge.target] ??= [];

    neighborList[edge.source].push(edge.target);
    neighborList[edge.target].push(edge.source);
  })

  

  function dfsVisit(node){
    if (visited.has(node)) return;
    visited.add(node);
  
    //record node visit 
    steps.push({
      type: 'visit-node',
      id: node,
    });

    for(const neighbor of neighborList[node] || []){
      if(!visited.has(neighbor)){
        steps.push({
          type: 'visit-edge',
          from: node,
          to: neighbor,
        });

        dfsVisit(neighbor)
      }
    }
    

  }
  
  dfsVisit(startId);
  return  steps;
}