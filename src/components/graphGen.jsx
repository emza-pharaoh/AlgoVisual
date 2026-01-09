export default function graphGen(nodeCount = 5) {

    const nodes = []
    const edges =[]

    // nodeCount = Math.random()
    // creating nodes
    for(let i = 0; i < nodeCount; i++){
        nodes.push({
            id: '${i}',
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
            data: {label: 'Node ${i}'},
        });
    }

    // Creat edges
    for (let i = 0; i < nodeCount - 1; i++){
        edges.push({
            id: 'e${i}-${i + 1}',
            source: '${i}',
            target: '${i + 1}'
        });
    
    }

    // Return graph data
    return {nodes, edges}

}