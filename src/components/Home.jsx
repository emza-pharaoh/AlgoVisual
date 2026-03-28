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
import Navbar from './Navbar';
import DescriptionPanel from './DescriptionPanel';
import CodePanel from './CodePanel';

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
const [algorithm, setAlgorithm] = useState("bfs");
const [graphType, setGraphType] = useState('random');
const [selectedAgo, setSelectedAlgo] = useState("bfs")


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

const handleAlgorithm = () => {
  let result
  if(algorithm === 'bfs'){
    const steps = bfs(nodes, edges, nodes[0]?.id);
    animateTraversal(steps, setNodes, setEdges);
  }
  if(algorithm === 'dfs') {
    const steps = dfs(nodes, edges, nodes[0]?.id);
    animateTraversal(steps, setNodes, setEdges);
  }
  if(algorithm === 'dijkstra') {
    const steps = dijkstra(nodes, edges, nodes[0]?.id);
    animateTraversal(steps, setNodes, setEdges);
  }
    

}
  

  return (

    
<div className=' min-h-screen flex flex-col bg-gray-100'>

{/* NAVBAR Desktop Only */}
    <div className=" lg:block shadow shadow-2xl h-10 bg-[#6A89A7] ">
      <Navbar/>
    </div>

     {/* desription Panel */}
    <div className="mt-3 border border-0 shadow-2xl rounded-2xl ">
      <DescriptionPanel selectedAgo={algorithm}/>
    </div>


{/* Main Content */}
<main className='flex-1  lg:p-8 max-w,7xl w-full m-1 bg-gradient-to-br from-soft via-[#6A89A7] to-dark'>
 

{/* Workspace */}
    <section className='grid grid-cols-1
                        lg:grid-cols-3
                        gap-6'>

    <div className="lg:col-span-2 min-h-100 border border-0">
    
      <GraphCanvas
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
  />
    </div>

    <div className="hidden lg:block border border-0 rounded-2xl shadow-2xl ">
      <CodePanel selectedAlgo={algorithm}/> 
    </div>

    </section>
    <div className='m-5'>

      <ControlPanel
        graphType={graphType}
        setGraphType={setGraphType}
        onGenerate={handleGenerate}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        onRun={handleAlgorithm}

        
    />
    </div>
     
</main>

   
  


    </div>
  )

}