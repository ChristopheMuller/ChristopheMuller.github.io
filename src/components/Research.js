import React from 'react';
import '../App.css';

function Research() {
  const publications = [
    {
      id: 2,
      title: 'Do we Need Dozens of Methods for Real World Missing Value Imputation?',
      authors: 'K. Grzesiak, C. Muller, J. Josse, J. Näf',
      venue: 'Preprint on Arxiv.',
      link: 'https://doi.org/10.48550/arXiv.2511.04833',
      stamp: 'Preprint',
      repo: 'https://github.com/ChristopheMuller/benchmark'
    },
    {
      id: 1,
      title: 'Graph-based multi-agent reinforcement learning for railway infrastructure decision support',
      authors: 'G. Arcieri, G. Duthé, C. Muller, D. Haener, K. Papakonstantinou, D. Straub, E. Chatzi',
      venue: '14th International Conference on Structural Safety and Reliability - ICOSSAR25.',
      link: 'https://doi.org/10.23967/icossar.2025.118',
      stamp: 'Conference',
      repo: 'https://github.com/ChristopheMuller/MARL_optimal_maintenance_graph_railway_network'
    },
    {
      id: 2,
      title: 'When Pattern-by-Pattern Works: Theoretical and Empirical Insights for Logistic Models with Missing Values',
      authors: 'C. Muller, E. Scornet, J. Josse',
      venue: 'Preprint on Arxiv.',
      link: 'https://doi.org/10.48550/arXiv.2507.13024',
      stamp: 'Preprint',
      repo: 'https://github.com/ChristopheMuller/logistic_with_NAs'
    },

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
              {pub.repo && (
                <a href={pub.repo} target="_blank" rel="noopener noreferrer" className="research-btn github">GitHub</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Research;
