import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls,  ReactFlowProvider, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
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
        });
    }

    // Creat edges
    for (let i = 0; i < nodeCount - 1; i++){
        edges.push({
            id: `e${i}-${i + 1}`,
            source: `${i}`,
            target: `${i + 1}`,
        });
    
    }
    // Return graph data
    return {nodes, edges}

}





function App() {

  const onNodesChange = useCallback(
  (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot), [],)
);

const onEdgesChange = useCallback(
  (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot), [])
);

  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  return (

    
     <div style={{ height: '100vh', width: '100vw' }} className='container'>

       <button type='button' onClick={() => {
        const {nodes, edges } = binaryGen();

        // Update state
        setNodes(nodes)
        setEdges(edges)
       }}
       className='border border-1 p-2 rounded-3xl bg-blue-500'>
        Generate Graph
      </button>

       <ReactFlowProvider>
        <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
