import React from 'react';
import '../App.css';

function Publications() {
  const publications = [
    {
      id: 1,
      title: 'Graph-based multi-agent reinforcement learning for railway infrastructure decision support',
      authors: 'G. Arcieri, G. Duthé, C. Muller, D. Haener, K. Papakonstantinou, D. Straub, E. Chatzi',
      venue: '14th International Conference on Structural Safety and Reliability - ICOSSAR25',
      link: 'https://www.scipedia.com/public/Arcieri_et_al_2025a', 
    },
    // You can add more publications here
  ];

  return (
    <section id="publications" className="projects-section">
      <h2>Publications</h2>
      <div className="projects-container">
        {publications.map(pub => (
          <div key={pub.id} className="project-card">
            <h3>{pub.title}</h3>
            <p><strong>Authors:</strong> {pub.authors}</p>
            <p><em>{pub.venue}</em></p>
            <div className="project-links">
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="project-btn">Read Paper</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Publications;
