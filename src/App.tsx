import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Slides from "./components/Slides";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/story/:id" element={<Slides />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
