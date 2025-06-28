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
          <li><a href="#publications" onClick={() => setMenuOpen(false)}>Publications</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
