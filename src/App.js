import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import MapComponent from './components/MapComponent'; // New import
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GameOfLife from './components/GameOfLife'; // Import Game of Life component
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        <MapComponent /> {/* Add the MapComponent here */}
        <Skills />
        <Projects />
        <Contact />
        <GameOfLife /> {/* Add the Game of Life component */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
