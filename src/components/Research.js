import React from 'react';
import '../App.css';

function Research() {
  const publications = [
    {
      id: 3,
      title: 'When Pattern-by-Pattern Works: Theoretical and Empirical Insights for Logistic Models with Missing Values.',
      authors: 'C. Muller, E. Scornet, J. Josse',
      date: '2025',
      link: 'https://doi.org/10.48550/arXiv.2507.13024',
      repo: 'https://github.com/ChristopheMuller/logistic_with_NAs'
    },
    {
      id: 2,
      title: 'Do we Need Dozens of Methods for Real World Missing Value Imputation?',
      authors: 'K. Grzesiak, C. Muller, J. Josse, J. Näf',
      date: '2025',
      link: 'https://doi.org/10.48550/arXiv.2511.04833',
      repo: 'https://github.com/ChristopheMuller/benchmark',
    },
    {
      id: 1,
      title: 'Graph-based multi-agent reinforcement learning for railway infrastructure decision support.',
      authors: 'G. Arcieri, G. Duthé, C. Muller, D. Haener, K. Papakonstantinou, D. Straub, E. Chatzi',
      date: '2025',
      link: 'https://doi.org/10.23967/icossar.2025.118',
      repo: 'https://github.com/ChristopheMuller/MARL_optimal_maintenance_graph_railway_network'
    },
  ];

  return (
    <section id="research" className="minimal-research-section">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-800 leading-tight">
        Research
      </h2>
      <ul className="minimal-research-list">
        {publications.map(pub => (
          <li key={pub.id} className="minimal-research-item">
            <div className="paper-text">
               <strong>{pub.title}</strong> ({pub.date})<br/>
               {pub.authors}
            </div>
            <div className="paper-links">
              <a href={pub.link} target="_blank" rel="noopener noreferrer">[Paper]</a>
              {pub.repo && (
                <a href={pub.repo} target="_blank" rel="noopener noreferrer">[GitHub]</a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Research;