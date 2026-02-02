export function graphGen(nodeCount = 6) {

    const nodes = []
    const edges =[]

    // nodeCount = Math.random()
    // creating nodes
    for(let i = 0; i < nodeCount; i++){
        nodes.push({
            id: `${i}`,
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
            data: {label: `Node ${i}`},
            style: {
              Background: '#1f2937',
              color: 'white',
              borderRadius: '',
              width: 60,
              height: 40,
            }
        });
    }

    // Creat Random edges
    for (let i = 0; i < nodeCount - 1; i++){
``
      const source = Math.floor(Math.random() * nodeCount);
      let target = Math.floor(Math.random() * nodeCount)

      //Prevents Self Loop
      if (source === target) continue

        edges.push({
            id: `e${source}-${target}-${i}`,
            source: `${source}`,
            target: `${target}`,
            style: { stroke: '#64748b' },
        });
    
    }
    // Return graph data
    return {nodes, edges}

}