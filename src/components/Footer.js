import React from 'react';
import '../App.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Christophe Muller. All rights reserved.</p>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/christophe-muller" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/ChristopheMuller" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://scholar.google.com/citations?user=TULXuW8AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
      </div>
    </footer>
  );
}

export default Footer;
