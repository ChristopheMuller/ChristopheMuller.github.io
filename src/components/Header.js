import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Optional: adjust offset if you have a sticky header
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on the homepage, navigate to the homepage with hash
      window.location.hash = `#${id}`;
    }
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
            Christophe
          </Link>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
          <li><a href="#journey" onClick={(e) => scrollToSection(e, 'journey')}>Journey</a></li>
          <li><a href="#research" onClick={(e) => scrollToSection(e, 'research')}>Research</a></li>
          <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a></li>
          <li><a href="https://drive.google.com/file/d/1yv1W7eKhy0TpWrzRbeUlMVBZvCY3nFib/view?usp=sharing" target="_blank" rel="noopener noreferrer">CV</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
