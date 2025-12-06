import React, { useEffect } from 'react'; // Import useEffect
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Research from './components/Research';
import Footer from './components/Footer';
import ImputationPaper from './components/ImputationPaper';

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
      <Journey />
      <Research />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      {/* 2. Add it inside the Router, before your content */}
      <ScrollToTop />

      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research/imputation-benchmark" element={<ImputationPaper />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;