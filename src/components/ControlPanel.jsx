



export default function ControlPanel({graphType, setGraphType, algorithm, setAlgorithm, onGenerate, onRun, onBFS, onDFS, onDijkstra}) {

    return(
         <div className="flex flex-wrap gap-2 p-2 justify-center container">
      <select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        className="rounded-xl p-3 font-bold shadow shadow-2xl backdrop-blur-2xl bg-gradent-to-br from-[#6A89A7] to-[#384959] translate-y-1 hover:translate-y-0 transition"
      >
        <option value="random">Random Graph</option>
        <option value="binary">Binary Graph</option>
        <option value="weighted">Weighted Graph</option>
      </select>


       <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="rounded-xl p-3 s font-bold shadow shadow-2xl backdrop-blur-2xl bg-gradent-to-br from-[#6A89A7] to-[#384959] translate-y-1 hover:translate-y-0 transition"
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="dijkstra">Dijkstra</option>
      </select>

      <button onClick={onGenerate} className="m-2 shadow shadow-2xl shadow-gray-500 py-6 px-10 rounded-2xl rounded-xl p-3 font-bold shadow shadow-2xl backdrop-blur-2xl bg-gradent-to-br from-[#6A89A7] to-[#384959] translate-y-1 hover:translate-y-0 transition">
        Generate
      </button>

      <button onClick={onRun} className="m-2 shadow shadow-2xl shadow-gray-500 py-6 px-10 rounded-2xl rounded-xl p-3 font-bold shadow shadow-2xl backdrop-blur-2xl bg-gradent-to-br from-[#6A89A7] to-[#384959] translate-y-1 hover:translate-y-0 transition">
        Run
      </button>

    </div>
    )
}