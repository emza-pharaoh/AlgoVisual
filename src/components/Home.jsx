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






///////// Handling Move Logic







export default function Home() {

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
  const [algorithm, setAlgorithm] = useState([]);
  const [graphType, setGraphType] = useState('random');




  const handleGenerate = () => {
  let result;

  if(graphType === 'random') result = graphGen()
  if(graphType === 'binary') result = binaryGen()
  if(graphType === 'weighted') result = weightedGraphGen()

    if(!result) return;

    setNodes(result.nodes)
    setEdges(result.edges)
}





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

    
     <div style={{ height: '80vh', width: '100vw' }} className='m-2 my-2'>

       <ReactFlowProvider>

      
        <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className='border border-gray-600 shadow shadow-2xl shadow-gray-900 z-1' 
        fitView>
            <Background />
          <Controls />

      </ReactFlow>
    

       </ReactFlowProvider>
         <div className="flex flex-row justify-center shadow shadow-2xl relative h-100vh w-100vw absolute pointer-events-auto"
        
        >
          
        <ControlPanel
        graphType={graphType}
        setGraphType={setGraphType}
        onGenerate={handleGenerate}
        onBFS={handleBFS}
        onDFS={handleDFS}
        onDijkstra={handleDijkstra}
      />
      
    </div>

    </div>
  )

}