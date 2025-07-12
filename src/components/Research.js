import React from 'react';
import '../App.css';

function Research() {
  const publications = [
    {
      id: 1,
      title: 'Graph-based multi-agent reinforcement learning for railway infrastructure decision support',
      authors: 'G. Arcieri, G. Duthé, C. Muller, D. Haener, K. Papakonstantinou, D. Straub, E. Chatzi',
      venue: '14th International Conference on Structural Safety and Reliability - ICOSSAR25',
      link: 'https://www.scipedia.com/public/Arcieri_et_al_2025a',
      stamp: 'Conference'
    },
    {
      id: 2,
      title: 'When Pattern-by-Pattern Works: Theoretical and Empirical Insights for Logistic Models with Missing Values',
      authors: 'C. Muller, E. Scornet, J. Josse',
      venue: 'Preprint on HAL',
      link: 'https://hal.science/view/index/docid/5150753',
      stamp: 'Preprint'
    },
    // {
    //   id: 3,
    //   title: 'Another Dummy Publication',
    //   authors: 'Author D, Author E',
    //   venue: 'Dummy Journal',
    //   link: '#',
    //   stamp: 'Journal'
    // }
    // You can add more publications here
  ];

  const getStampClassName = (stamp) => {
    const stampType = stamp.toLowerCase();
    if (stampType.includes('conference')) {
      return 'conference';
    }
    if (stampType.includes('preprint')) {
      return 'preprint';
    }
    if (stampType.includes('journal')) {
      return 'journal';
    }
    return '';
  };

  return (
    <section id="research" className="research-section">
      <h2>Research</h2>
      <div className="research-container">
        {publications.map(pub => (
          <div key={pub.id} className="research-item">
            <div className={`research-stamp ${getStampClassName(pub.stamp)}`}>{pub.stamp}</div>
            <h3>{pub.title}</h3>
            <p><strong>Authors:</strong> {pub.authors}</p>
            <p><em>{pub.venue}</em></p>
            <div className="research-links">
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="research-btn">Read Paper</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Research;
