import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls,  ReactFlowProvider, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


//Depth First Search Implementation - FUNCTIONAL✅
function dfs(nodes, edges, startId){
  const visited = new Set();
  const steps = [];
  const neighborList = [];

  edges.forEach(edge => {
    neighborList[edge.source] ??= [];
    neighborList[edge.target] ??= [];

    neighborList[edge.source].push(edge.target);
    neighborList[edge.target].push(edge.source);
  })

  

  function dfsVisit(node){
    if (visited.has(node)) return;
    visited.add(node);
  
    //record node visit 
    steps.push({
      type: 'visit-node',
      id: node,
    });

    for(const neighbor of neighborList[node] || []){
      if(!visited.has(neighbor)){
        steps.push({
          type: 'visit-edge',
          from: node,
          to: neighbor,
        });

        dfsVisit(neighbor)
      }
    }
    

  }
  
  dfsVisit(startId);
  return  steps;
}
 //Breathd First Search Implementation - FUNCTIONAL✅
function bfs(nodes, edges, startId){

  //This funcion runs BFS, but instead of just visiting nodes, it records every step so you can animate it later.
  const visited = new Set();    //keep track of visited nodes
  const steps = [];             //Animate steps
  const neighborList = {};


  //build neighborListeacency list
  edges.forEach(edge => {
    neighborList[edge.source] ??= [];
    neighborList[edge.target] ??= [];

    neighborList[edge.source].push(edge.target);
    neighborList[edge.target].push(edge.source);
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
    const neighbors =  neighborList[current]?.slice() || []
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

//dijkstras Algorithm Implementation
function Dijkstra(nodes, edges, startId){
  const steps = [];
  const neighborList = buildNeighborList(edges);
  const dist = {};
  const visited = new Set();


  nodes.forEach( node => {
    dist[node.id] = Infinity
  })
  dist[startId] = 0;


  //Build a list of neighbor relationships
  edges.forEach( edge => {
    const w = edge.data?.weight ?? 1;

    neighborList[edge.source] ??= []
    neighborList[edge.target] ??= []

    neighborList[edge.source].push({ node: edge.target, weight: w})
    neighborList[edge.target].push({ node: edge.source, weight: w})
  });

  //Priority Queue
  const pq = [{ node: startId, dist: 0}];

  while (pq.length){

    pq.sort( (a, b) => a.dist - b.dist) //Sorting to simulate a min-heap                                     // 
    const { node: current } = pq.shift() //popping the first element off the sorted array

    if (visited.has(current)) continue;
    visited.add(current);

    //record visited node
    steps.push({
      type: 'visit-node',
      id: current,
      dist: dist[current],
    });

    for (const { node: neighbor, weight } of neighborList[current] || []){
    if (visited.has(neighbor)) continue;

    const newDist = dist[current] + weight

    if(newDist < dist[neighbor]){
      dist[neighbor] = newDist;

      //record edge relaxation
      steps.push({
        type: 'relax-edge',
        from: current,
        to: neighbor,
        weight,
        newDist,
      });

      pq.push({ node: neighbor, dist: newDist })
    }
  }
  }

  

  return steps
}

// ==================ANIMATION==============//

//animated Breadth First Search
function animateBFS(steps, setNodes, setEdges){
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


// ==================Graog==ph Type Generators=====//
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
        data: { weight: Math.floor(Math.random() * 9) + 1}
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
// Random Tree Generator 
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

//Wieghted Graph Generator
function weightedGraphGen(nodeCount = 6, extraEdgeChance = 0.4){
 const nodes = [];
 const edges = [];

  for (let i = 0; i < nodeCount; i++){
    nodes.push({
      id: String(i), 
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
    },
      data: {label: `Node ${i}`,
      
    }
    })
  }

  for (let i = 0; i < nodeCount - 1; i++){
    const weight = Math.floor(Math.random() * 9) + 1;

    edges.push({
      id: `e${i}-${i + 1}`,
      source: String(i),
      target: String(i + 1),
      data: { weight },
      style: { stroke: '#64748b' },
    })
  }

  // 2️⃣ ADD RANDOM EXTRA EDGES
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 2; j < nodeCount; j++) {
      if (Math.random() < extraEdgeChance) {
        const weight = Math.floor(Math.random() * 9) + 1;

        edges.push({
          id: `e${i}-${j}`,
          source: String(i),
          target: String(j),
          data: { weight },
          label: String(weight),
          style: { stroke: '#64748b' },
        });
      }
    }
  }

  return { nodes, edges }

}

//Neighborlist builder for Dijsktras Algorithm
function buildNeighborList(edges){
  const neighborList = {} 

  for (const {source, target, weight} of edges){
    if(!neighborList[source])  neighborList[source] = []
    if(!neighborList[target]) neighborList[target] = []

    neighborList[source].push({ node: target, weight })
    neighborList[target].push({ node: source, weight})
  }

  return neighborList
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
          animateBFS(steps, setNodes, setEdges);
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
          animateBFS(steps, setNodes, setEdges);
         }}
         className='m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl'
      >     
           Start DFS
      </button>

      <button
        type="button"
        onClick={() => {
          // Generate BFS steps from current graph
          const steps = Dijkstra(nodes, edges, nodes[0].id);
          console.log(steps)

          // Animate traversal
          animateBFS(steps, setNodes, setEdges);
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
