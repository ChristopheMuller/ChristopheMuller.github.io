import React from 'react';
import '../App.css';

function Skills() {
  const skills = [
    'JavaScript (ES6+)', 'React.js', 'Node.js', 'HTML5', 'CSS3',
    'Git', 'GitHub', 'RESTful APIs', 'Database (e.g., SQL/NoSQL)',
    'Responsive Design', 'Problem Solving', 'Teamwork'
  ];

  return (
    <section id="skills" className="skills-section">
      <h2>My Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </section>
  );
}

export default Skills;