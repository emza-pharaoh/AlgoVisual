import Home from './components/Home';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import '@xyflow/react/dist/style.css';


function App() {

  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
