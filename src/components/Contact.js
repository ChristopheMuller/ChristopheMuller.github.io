import React from 'react';
import '../App.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Get In Touch</h2>
      <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
      <div className="contact-info">
        <p>Email: <a href="mailto:your.email@example.com">your.email@example.com</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">linkedin.com/in/yourprofile</a></p>
        <p>GitHub: <a href="https://github.com/ChristopheMuller" target="_blank" rel="noopener noreferrer">github.com/ChristopheMuller</a></p>
        {/* You can add a simple form later if you wish */}
      </div>
    </section>
  );
}

export default Contact;