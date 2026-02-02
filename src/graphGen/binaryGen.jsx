export function binaryGen(maxDepth = 2, maxChildren = 2){
  const nodes = [];
  const edges = [];

  // Used to give every node a unique id
  let idCounter = 0; 

  function createNode(x, y, depth, parentId= null){
    const id = `${idCounter++}`;

    // add current node to the nodes array
    nodes.push({
      id,
      position: {x, y},
      data: {  label: Math.floor(Math.random() * 100) },
    });

    // If this node has a parent than connect parent to child
    if (parentId !== null){
      edges.push({
        id: `e${parentId}-${id}`,
        source: parentId,
        target: id,
        data: { weight: Math.floor(Math.random() * 9) + 1}
      })
    }

     if (depth >= maxDepth || Math.random() < 0.3) return;

     
    const childCount = Math.floor(Math.random() + (maxChildren + 1));
    const offsetX = 350  / (depth + 1);
    // Keeps the tree compact and readable, decreases horizontal spacing as depth increases

    const offsetY = 100;

    createNode(
      x - offsetX,
      y + offsetY,
      depth + 1,
      id
    );

    createNode(
      x + offsetX,
      y + offsetY,
      depth + 1,
      id
    );

   
  }

   
    createNode(
      300,
      50,
      0
    );

  console.log(nodes, edges)
  return {nodes, edges}
}