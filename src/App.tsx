import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./Home";
import { LeaderBoard } from './components/LeaderBoard';
import Slides from './components/Slides';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/leader" element={<LeaderBoard />}  />
        <Route path="/story/:id" element={<Slides />}  />
      </Routes>
    </Router>

  );
}

export default App;
