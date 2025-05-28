import React from 'react';
import '../App.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Christophe Muller!</h1>
        <h2>Research Engineer at INRIA & Future DPhil Student at Oxford</h2>
        <p>
          Welcome to my corner of the internet. I am passionate about statistical methods, deep learning,
          and leveraging cutting-edge technologies to solve complex problems in various domains.
        </p>
        <a href="#contact" className="btn">Let's Connect</a>
      </div>
    </section>
  );
}

export default Hero;