import { ReactFlow, Background, Controls,  ReactFlowProvider, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';




export default function GraphCanvas({nodes, edges, onNodesChange, onEdgesChange, onConnect}) {
   
   
    return(

         <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className='border border-0 rounded-2xl shadow shadow-2xl shadow-gray-900 z-1' 
        fitView>
            <Background />
          <Controls />

      
      </ReactFlow>
    )
}