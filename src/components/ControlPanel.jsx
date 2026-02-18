



export default function ControlPanel({graphType, setGraphType, onGenerate, onBFS, onDFS, onDijkstra}) {

    return(
         <div className="flex flex-wrap gap-2 p-2 justify-center">
      <select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        className="rounded-xl p-3 shadow"
      >
        <option value="random">Random Graph</option>
        <option value="binary">Binary Graph</option>
        <option value="weighted">Weighted Graph</option>
      </select>

      <button onClick={onGenerate} className="m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl">
        Generate
      </button>

      <button onClick={onBFS} className="m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl">
        BFS
      </button>

      <button onClick={onDFS} className="m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl">
        DFS
      </button>

      <button onClick={onDijkstra} className="m-2 shadow shadow-2xl shadow-gray-800 py-6 px-10 rounded-2xl">
        Dijkstra
      </button>
    </div>
    )
}