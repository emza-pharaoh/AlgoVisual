import { useState } from 'react';
import { ReactFlow, Background, Controls,  ReactFlowProvider } from '@xyflow/react';
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
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  return (

    
     <div style={{ height: '100%', width: '100%' }}>

       <button type='button' onClick={() => {
        const {nodes, edges } = graphGen();

        // Update state
        setNodes(nodes)
        setEdges(edges)
       }}
       className='border border-1 p-2 rounded-3xl bg-blue-500'>
        Generate Graph
      </button>

       <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
          <Controls />
      </ReactFlow>

       </ReactFlowProvider>
      
    </div>
  )
}

export default App
