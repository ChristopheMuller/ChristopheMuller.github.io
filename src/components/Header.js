import React, { useState } from 'react';
import '../App.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">Christophe</div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a></li>
          <li><a href="#research" onClick={() => setMenuOpen(false)}>Research</a></li>
          <li><a href="https://drive.google.com/file/d/1kX6Ipb34hY47925-Hjmurl4MtMpvPmlz/view?usp=sharing" target="_blank" rel="noopener noreferrer">CV</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
