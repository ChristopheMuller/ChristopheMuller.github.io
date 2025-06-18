// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import MusicStats from './components/MusicStats';
import Projects from './components/Projects';
import Contact from './components/Contact';
// import GameOfLife from './components/GameOfLife';
// import KMeansVisualizer from './components/KMeansVisualizer';
// import RegressionFitter from './components/RegressionFitter';
// import GoogleSheetEmbed from './components/GoogleSheetEmbed'; // If you also have the full sheet embed
import GoogleChartEmbed from './components/Running'; // <--- NEW IMPORT
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        <MusicStats />
        {/* <GoogleSheetEmbed /> If you want to include the full sheet too */}
        <GoogleChartEmbed /> {/* <--- NEW COMPONENT USAGE */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;