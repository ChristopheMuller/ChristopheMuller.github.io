import React from 'react';
import '../App.css';
import RegressionFitter from './RegressionFitter';
import SocialLinks from './SocialLinks';

function Connect() {
  // Assemble the address from parts at click-time so the raw string and a
  // `mailto:` link never appear in the static HTML for scrapers to harvest.
  const handleEmail = () => {
    const user = ['christophe', 'muller'].join('.');
    const domain = ['stats', 'ox', 'ac', 'uk'].join('.');
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <section id="connect" className="connect-section">
      <h2>Get In Touch</h2>
      <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>

      <div className="connect-actions">
        <button type="button" className="email-button" onClick={handleEmail}>
          <span className="email-icon" aria-hidden="true">✉</span>
          Email me
        </button>
        <span className="email-hint">christophe·muller [at] stats·ox·ac·uk</span>
      </div>

      <SocialLinks className="connect-social" />

      <RegressionFitter />
    </section>
  );
}

export default Connect;
