import React from 'react';
import '../App.css';
import RegressionFitter from './RegressionFitter';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Get In Touch</h2>
      <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
      <div className="contact-info">
        <p>Email: mullerchristophe21[~at~]gmail[~dot~]com</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/christophe-muller" target="_blank" rel="noopener noreferrer">linkedin.com/in/christophe-muller</a></p>
        <p>GitHub: <a href="https://github.com/ChristopheMuller" target="_blank" rel="noopener noreferrer">github.com/ChristopheMuller</a></p>
        {/* You can add a simple form later if you wish */}
      </div>
      <RegressionFitter />
    </section>
  );
}

export default Contact;
