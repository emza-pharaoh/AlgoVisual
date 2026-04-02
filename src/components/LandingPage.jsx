import { useNavigate } from 'react-router-dom';


export default function Landing() {
    const navigate = useNavigate();
  return (
    <div className="bg-blue-300 min-h-screen bg-animated flex flex-col bg-[url('/algoVbg.png')] bg-cover bg-center">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-4">
        <h1 className="text-white font-bold text-lg">
          Graph Visualizer
        </h1>

        <div className="flex gap-3">
          <button className="text-white">Home</button>
          <button className="text-white">Learn</button>
        </div>
      </nav>


      {/* HERO */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6">

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Graph Algorithm Visualizer
        </h1>

        <p className="text-white/80 max-w-xl mb-6">
          Explore how BFS, DFS, and Dijkstra work in real-time through
          interactive graphs and animations.
        </p>

        <button
          onClick={() => navigate('/home')}
          className="bg-white text-black px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Start Exploring
        </button>

      </div>
z

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
          <h2 className="font-bold mb-2">BFS</h2>
          <p className="text-sm opacity-80">
            Explore graphs level by level and find shortest paths.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
          <h2 className="font-bold mb-2">DFS</h2>
          <p className="text-sm opacity-80">
            Dive deep into graphs and explore all possible paths.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
          <h2 className="font-bold mb-2">Dijkstra</h2>
          <p className="text-sm opacity-80">
            Find shortest paths in weighted graphs visually.
          </p>
        </div>

      </div>

    </div>
  );
}