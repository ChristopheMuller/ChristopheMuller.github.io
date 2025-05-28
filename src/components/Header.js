import React from 'react';
import '../App.css'; // Assuming App.css for basic styles

function Header() {
  return (
    <header className="header">
      <nav>
        <div className="logo">Christophe Muller</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;