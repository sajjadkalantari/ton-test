import { HashRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./Home";
import { LeaderBoard } from './components/LeaderBoard';
import Slides from './components/Slides';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/leader" element={<LeaderBoard />}  />
        <Route path="/story/:id" element={<Slides />}  />
      </Routes>
    </HashRouter>

  );
}

export default App;
