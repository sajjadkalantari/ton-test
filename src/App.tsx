import { HashRouter, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from "./Home";
import { LeaderBoard } from './components/LeaderBoard';
import Slides from './components/Slides';
import { MobileMenue } from './components/MobileMenu';
import { useState } from 'react';

function App() {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    // You can add logic here to navigate or perform actions based on the clicked item.
  };
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/leader" element={<LeaderBoard />} />
        <Route path="/story/:id" element={<Slides />} />
      </Routes>
      <div style={{ marginTop: "80px" }}></div>
      <MobileMenue activeItem={activeItem} onItemClick={handleItemClick} />
    </HashRouter>

  );
}

export default App;
