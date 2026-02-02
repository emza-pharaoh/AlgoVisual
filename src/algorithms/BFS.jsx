export function bfs(nodes, edges, startId) {

    
  //This funcion runs BFS, but instead of just visiting nodes, it records every step so you can animate it later.
  const visited = new Set();    //keep track of visited nodes
  const steps = [];             //Animate steps
  const neighborList = {};


  //build neighborListeacency list
  edges.forEach(edge => {
    neighborList[edge.source] ??= [];
    neighborList[edge.target] ??= [];

    neighborList[edge.source].push(edge.target);
    neighborList[edge.target].push(edge.source);
  })

  const queue = [startId]
  visited.add(startId)

  while(queue.length){
    const current = queue.shift()  //deque the node

    //record node visit step

    steps.push({
      type: 'visit-node',
      id: current,
    })

    //visit neighbors
    const neighbors =  neighborList[current]?.slice() || []
    for (const neighbor of neighbors){
      if(!visited.has(neighbor)){
        visited.add(neighbor);

         //record edge traversal step
      steps.push({
        type: 'visit-edge',
        from: current,
        to: neighbor,
      });

        queue.push(neighbor)
      }

       
    }

    

  

  }
  return steps
}