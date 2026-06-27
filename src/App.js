import React, { useEffect, useRef, useState, useCallback } from 'react'; // Import useEffect
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Connect from './components/Connect';
import Research from './components/Research';
import Footer from './components/Footer';
import GameOfLifeBackground from './components/GameOfLifeBackground';

// 1. Create this helper component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "0, 0" means top left of the screen
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the URL path changes

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Research />
      <Connect />
    </>
  );
}

function App() {
  // Easter egg: 5 clicks on the "Christophe" logo within 2s toggles a faint
  // Game of Life drifting behind the whole site. 5 more clicks turns it off.
  const [golActive, setGolActive] = useState(false);
  const clickTimesRef = useRef([]);

  const handleNameClick = useCallback(() => {
    const now = Date.now();
    const recent = [...clickTimesRef.current, now].filter((t) => now - t < 2000);
    if (recent.length >= 5) {
      clickTimesRef.current = [];
      setGolActive((prev) => !prev);
    } else {
      clickTimesRef.current = recent;
    }
  }, []);

  return (
    <Router>
      {/* 2. Add it inside the Router, before your content */}
      <ScrollToTop />

      <div className="App">
        <GameOfLifeBackground active={golActive} />
        <Header onNameClick={handleNameClick} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;