import { BrowserRouter as Router, Route, Routes, HashRouter  } from 'react-router-dom';
import Home from "./Home";
import Slides from './components/Slides';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:id" element={<Slides />} />
      </Routes>
    </HashRouter>

  );
}

export default App;
