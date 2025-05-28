import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GameOfLife from './components/GameOfLife';
import KMeansVisualizer from './components/KMeansVisualizer';
import RegressionFitter from './components/RegressionFitter'; // New import
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Contact />
        {/* <GameOfLife />
        <KMeansVisualizer />
        <RegressionFitter /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
