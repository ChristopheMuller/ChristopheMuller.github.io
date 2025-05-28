import React from 'react';
import '../App.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Mini-enterprise Stroboo (CEO)',
      description: 'As CEO, I organized and managed a 20-member high-school-based mini-enterprise that sold reusable, bamboo-made straws. This initiative aimed to fight the environmental effects of plastic and to respond to EU policy. My role involved strategic organization and decision-making for the enterprise.',
      liveLink: '#', // Placeholder, update if you have a website for this
      githubLink: '#', // Placeholder, update if you have a public repo
      image: 'https://via.placeholder.com/300x200?text=Stroboo+Project' // Placeholder image
    },
    // You can add more personal projects here if you have any side projects with code/demos!
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-container">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-links">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-btn">Live Demo</a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;