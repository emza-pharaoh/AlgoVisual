



export default function ControlPanel({graphType, setGraphType, algorithm, setAlgorithm, onGenerate, onRun, onBFS, onDFS, onDijkstra}) {

    return(
         <div className="flex flex-wrap gap-2 p-2 justify-center container">
      <select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        className="rounded-xl p-3 shadow"
      >
        <option value="random">Random Graph</option>
        <option value="binary">Binary Graph</option>
        <option value="weighted">Weighted Graph</option>
      </select>


       <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="rounded-xl p-3 shadow"
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="dijkstra">Dijkstra</option>
      </select>

      <button onClick={onGenerate} className="m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl">
        Generate
      </button>

      <button onClick={onRun} className="m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl">
        Run
      </button>

    </div>
    )
}