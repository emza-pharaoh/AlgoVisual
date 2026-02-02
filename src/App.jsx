import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls,  ReactFlowProvider, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import Home from './components/Home';
import '@xyflow/react/dist/style.css';

// Algorithms Duh!
import { bfs } from './algorithms/BFS';
import { dfs } from './algorithms/DFS';
import { dijkstra } from './algorithms/dijkstra';

// Graph Generators
import { binaryGen } from './graphGen/binaryGen';
import { graphGen } from './graphGen/graphGen';
import { weightedGraphGen } from './graphGen/weightedGraph';

// ==================ANIMATION==============//

//animated Breadth First Search
import { animateTraversal } from './animation/animateTraversal';




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
  const [algorithm, setAlgorithm] = useState([]);
  const [graphType, setGraphType] = useState('random');

  return (

    
     <div style={{ height: '100vh', width: '100vw' }} className='m-2 my-2'>

       <ReactFlowProvider>

        <div className="flex flex-row justify-center shadow shadow-2xl relative h-100vh w-100vw absolute pointer-events-auto"
        
        >

        <select value={graphType} onChange={(e) => setGraphType(e.target.value)}
      className='m-2 shadow shadow-2xl animate hover:animate-bounce hover hover:duration-300 border border-cyan-800 shadow-green-800 py-5 px-7 rounded-2xl'
        >
        <option value="random">Random Graph</option>
        <option value="binary">Binary Graph</option>
        <option value="weighted">Weighted Graph</option>

      </select>


         <button type='button' 
         
         onClick={() => {
        let result;

        if(graphType === 'random'){
          result = graphGen()
        }
        if(graphType === 'binary'){
          result = binaryGen()
        }
        if(graphType === 'weighted'){
          result = weightedGraphGen()
        }
        if (!result) return;+


        setNodes(result.nodes);
        setEdges(result.edges);

        
      }} 
      className='m-2 shadow shadow-2xl animate hover:animate-bounce hover hover:duration-300 shadow-green-800 py-5 px-10 rounded-2xl'
>
        Generate Graph
        </button>
       

      <button
        type="button"
        onClick={() => {
          // Generate BFS steps from current graph
          const steps = bfs(nodes, edges, '0');
          console.log(steps)

          // Animate traversal
          animateTraversal(steps, setNodes, setEdges);
         }}
         className='m-2 shadow shadow-2xl shadow-gray-800 py-5 px-10 rounded-2xl'
      >     
           Start BFS
      </button>

      <button
        type="button"
        onClick={() => {
          // Generate BFS steps from current graph
          const steps = dfs(nodes, edges, nodes[0].id);
          console.log(steps)

          // Animate traversal
          animateTraversal(steps, setNodes, setEdges);
         }}
         className='m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl'
      >     
           Start DFS
      </button>

      <button
        type="button"
        onClick={() => {
          // Generate BFS steps from current graph
          const steps = dijkstra(nodes, edges, nodes[0].id);
          console.log(steps)

          // Animate traversal
          animateTraversal(steps, setNodes, setEdges);
         }}
        className='m-2 shadow shadow-2xl shadow-gray-800 py-5 px-10 rounded-2xl'

      >     
          Dijkstra's Algorithm
      </button>


    </div>
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
      
    </div>
  )
}

export default App
