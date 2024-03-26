import { HashRouter, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from "./Home";
import { LeaderBoard } from './LeaderBoard';
import Slides from './components/Slides';
import { MobileMenue } from './components/MobileMenu';
import { useState } from 'react';
import { Games } from './Games';
import { Referrals } from './components/Referrals';
import { Staking } from './Staking';
import WelcomeVideo from './components/WelcomeVideo';

function App() {
  const [activeItem, setActiveItem] = useState('home');
  const [videoEnded, setVideoEnded] = useState(false);
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };
  const handleItemClick = (item: string) => {
    setActiveItem(item);
    // You can add logic here to navigate or perform actions based on the clicked item.
  };
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/leader" element={<LeaderBoard />} />
        <Route path="/story/:id" element={<Slides />} />
      </Routes>
      <div style={{ marginTop: "80px" }}></div>
      <MobileMenue activeItem={activeItem} onItemClick={handleItemClick} />
    </HashRouter>

    // <>
    //   {!videoEnded ? (
    //     <WelcomeVideo onVideoEnd={handleVideoEnd} />
    //   ) : (

    //   )}
    // </>
  );
}

export default App;
