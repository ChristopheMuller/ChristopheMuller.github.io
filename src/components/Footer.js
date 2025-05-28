import React from 'react';
import '../App.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Christophe Muller. All rights reserved.</p>
      <div className="social-links">
        {/* Add your social media icons/links here */}
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
        <a href="https://github.com/ChristopheMuller" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  );
}

export default Footer;