import React from 'react';
import '../App.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Christophe!</h1>
        <h2>A Passionate Web Developer & Creator</h2>
        <p>
          Welcome to my corner of the internet. I build engaging and user-friendly web applications.
          Let's create something amazing together!
        </p>
        <a href="#contact" className="btn">Get In Touch</a>
      </div>
    </section>
  );
}

export default Hero;