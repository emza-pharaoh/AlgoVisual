import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls,  ReactFlowProvider, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';

// Algorithms Duh!
import { bfs } from '../algorithms/BFS';
import { dfs } from '../algorithms/DFS';
import { dijkstra } from '../algorithms/dijkstra';

// Graph Generators
import { binaryGen } from '../graphGen/binaryGen';
import { graphGen } from '../graphGen/graphGen';
import { weightedGraphGen } from '../graphGen/weightedGraph';

// ==================ANIMATION==============//

//animated Breadth First Search
import { animateTraversal } from '../animation/animateTraversal';


import ControlPanel from './ControlPanel';
import GraphCanvas from './graphCanvas';



export default function Home() {

  const onConnect = useCallback(
  (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot) ), []
);

  const onNodesChange = useCallback(
  (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []
);

  const onEdgesChange = useCallback(
  (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []
);

const [edges, setEdges] = useState([]);
const [nodes, setNodes] = useState([]);
const [algorithm, setAlgorithm] = useState([]);
const [graphType, setGraphType] = useState('random');



// Handle Graph Generating Logic
  const handleGenerate = () => {
  let result;

  if(graphType === 'random') result = graphGen()
  if(graphType === 'binary') result = binaryGen()
  if(graphType === 'weighted') result = weightedGraphGen()

    if(!result) return;

    setNodes(result.nodes)
    setEdges(result.edges)
}




//Handle Algorithm Generation
  const handleBFS = () => {
    const steps = bfs(nodes, edges, nodes[0]?.id);
    animateTraversal(steps, setNodes, setEdges);
  };

  const handleDFS = () => {
    const steps = dfs(nodes, edges, nodes[0]?.id);
    animateTraversal(steps, setNodes, setEdges);
  };

  const handleDijkstra = () => {
    const steps = dijkstra(nodes, edges, nodes[0]?.id);
    animateTraversal(steps, setNodes, setEdges);
  };
  

  return (

    
<div className='min-h-screen flex flex-col bg-gray-100'>

{/* NAVBAR Desktop Only */}
    <div className="hidden lg:block border shadow shadow-2xl h-10 py-5">
      NAVBAR
    </div>


{/* Main Content */}
<main className='flex-1 p-4 lg:p-8 max-w,7xl mx-auto w-full'>
  {/* desription Panel */}
    <div className="mb-6 border ">
      Description Panel
    </div>

{/* Workspace */}
    <section className='grid grid-cols-1
                        lg:grid-cols-3
                        gap-6'>

    <div className="lg:col-span-2 min-h-100">
    
      <GraphCanvas
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
  />
    </div>

    <div className="hidden lg:block border">
      Code Panel
    </div>

    </section>
</main>

   
  
 <ControlPanel
        graphType={graphType}
        setGraphType={setGraphType}
        onGenerate={handleGenerate}
        onBFS={handleBFS}
        onDFS={handleDFS}
        onDijkstra={handleDijkstra}
    />

    </div>
  )

}