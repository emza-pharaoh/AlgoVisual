import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls,  ReactFlowProvider, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
  },
  {
    id: 'n2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
];

const initialEdges = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    type: 'step',
    label: 'connects with',
  },
];

function bfs(nodes, edges, startId){

  //This funcion runs BFS, but instead of just visiting nodes, it records every step so you can animate it later.
  const visited = new Set();    //keep track of visited nodes
  const steps = [];             //Animate steps
  const adj = {};


  //build adjeacency list
  edges.forEach(edge => {
    adj[edge.source] ??= [];
    adj[edge.target] ??= [];

    adj[edge.source].push(edge.target);
    adj[edge.target].push(edge.source)
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
    const neighbors =  adj[current]?.slice() || []
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

function animateBFS(steps, setNodes, setEdges){
  steps.forEach((step, index) => {
    setTimeout(() => {

      //Highlight visited nodes
      if(step.type === 'visit-node'){
        setNodes(nodes =>
          nodes.map(
            node => nodes.id === step.id
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

// Binary Tree Generator
function binaryGen(maxDepth = 2, maxChildren = 2){
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

function graphGen(nodeCount = 6) {

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





function App() {

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot) ), []
  )

  const onNodesChange = useCallback(
  (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []
);

const onEdgesChange = useCallback(
  (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []
);

  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  return (

    
     <div style={{ height: '100vh', width: '100vw' }} className='container'>

       <button 
       type='button' 
       onClick={() => {
        const {nodes, edges } = binaryGen();
        // Update state
        setNodes(nodes)
        setEdges(edges)
       }}
       className='font-bold border border-1 p-2 rounded-xl bg-blue-500 m-5'>
        Generate Graph
      </button>

      <button
        type="button"
        onClick={() => {
          // Generate BFS steps from current graph
          const steps = bfs(nodes, edges, '0');
          console.log(steps)

          // Animate traversal
          animateBFS(steps, setNodes, setEdges);
  }}
>
  Start BFS
</button>

       <ReactFlowProvider>
        <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className='conatiner' 
        fitView>
            <Background />
          <Controls />
      </ReactFlow>

       </ReactFlowProvider>
      
    </div>
  )
}

export default App
