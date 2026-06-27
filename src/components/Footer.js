import React from 'react';
import '../App.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Christophe Muller. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
