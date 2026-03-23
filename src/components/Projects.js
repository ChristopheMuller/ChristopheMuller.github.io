import React from 'react';
import '../App.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Spotify Vote (VibeVote)',
      description: 'A web application that allows a host to connect their Spotify account, select a playlist, and let guests vote on which tracks should play next.',
      repo: 'https://github.com/ChristopheMuller/VibeVote',
      image: `${process.env.PUBLIC_URL}/VibeVote.png`
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>Personal Projects</h2>
      <div className="projects-container">
        {projects.map(proj => (
          <div key={proj.id} className="project-card">
            {proj.image && (
              <img src={proj.image} alt={proj.title} className="project-image" />
            )}
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div className="project-links">
              {proj.repo && (
                <a href={proj.repo} target="_blank" rel="noopener noreferrer" className="project-btn github">GitHub Repository</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
