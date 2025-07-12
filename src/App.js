// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Contact from './components/Contact';
// import GameOfLife from './components/GameOfLife';
// import KMeansVisualizer from './components/KMeansVisualizer';
// import RegressionFitter from './components/RegressionFitter';
// import GoogleSheetEmbed from './components/GoogleSheetEmbed'; // If you also have the full sheet embed
import Research from './components/Research';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
        {/* <GoogleSheetEmbed /> If you want to include the full sheet too */}
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
