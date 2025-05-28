import React from 'react';
import '../App.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Get In Touch</h2>
      <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
      <div className="contact-info">
        <p>Email: <a href="mailto:mullerchristophe21@gmail.com">mullerchristophe21@gmail.com</a></p> [cite: 1]
        <p>LinkedIn: <a href="https://www.linkedin.com/in/christophe-muller" target="_blank" rel="noopener noreferrer">linkedin.com/in/christophe-muller</a></p> [cite: 1]
        <p>GitHub: <a href="https://github.com/ChristopheMuller" target="_blank" rel="noopener noreferrer">github.com/ChristopheMuller</a></p>
        {/* You can add a simple form later if you wish */}
      </div>
    </section>
  );
}

export default Contact;