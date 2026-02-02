export function animateTraversal(steps, setNodes, setEdges){
  steps.forEach((step, index) => {
    setTimeout(() => {

      //Highlight visited nodes
      if(step.type === 'visit-node'){
        setNodes(nodes =>
          nodes.map(
            node => node.id === step.id
            ? {
              ...node,
              style: {
                ...node.style,
                background: '#22c55e',
              },
            } : node
          )
        )
      }

      //highlight traversed edge
      if(step.type === 'visit-edge'){

        setEdges(edges =>
          edges.map(edge => edge.source === step.from && edge.target === step.to
            ? { ...edge, style: {stroke: '#22c55e', strokeWidth: 2,}} : edge
          )
          
        )
      }


    }, index* 500); //controls animation speed
  })
}
