import React from 'react';
import '../App.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A web application built using React and Node.js for managing tasks. Features user authentication and real-time updates.',
      liveLink: '#', // Replace with actual link
      githubLink: '#', // Replace with actual link
      image: 'https://via.placeholder.com/300x200?text=Project+Alpha' // Placeholder image
    },
    {
      id: 2,
      title: 'Project Beta',
      description: 'An e-commerce front-end mock-up demonstrating responsive design and state management with Redux.',
      liveLink: '#',
      githubLink: '#',
      image: 'https://via.placeholder.com/300x200?text=Project+Beta'
    },
    // Add more projects here
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