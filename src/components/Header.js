import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import SocialLinks from './SocialLinks';

function Header({ onNameClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection('');
    if (onNameClick) onNameClick();
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${id}`;
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const sectionIds = ['about', 'research'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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
          <li>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#research"
              className={activeSection === 'research' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'research')}
            >
              Research
            </a>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1yv1W7eKhy0TpWrzRbeUlMVBZvCY3nFib/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
          </li>
          <li className="nav-social"><SocialLinks className="header-social" /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
