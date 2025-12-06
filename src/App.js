import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Research from './components/Research';
import Footer from './components/Footer';
import ImputationPaper from './components/ImputationPaper';

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