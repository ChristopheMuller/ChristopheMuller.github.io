import React from 'react';
import '../App.css';

function Skills() {
  const skills = [
    'R', 'Python', // Software [cite: 10]
    'JavaScript (ES6+)', 'React.js', 'Node.js', // General Web Dev skills
    'HTML5', 'CSS3', 'Git', 'GitHub', 'RESTful APIs',
    'Deep learning', 'Statistical methods', 'Reinforcement learning', // From ETH coursework [cite: 1]
    'Econometrics', 'Operations Research', // From Maastricht coursework [cite: 3]
    'Machine learning', 'Systems analysis and design', // From Honours program [cite: 4]
    'Responsive Design', 'Problem Solving', 'Data Analysis',
    'French (Native)', 'English (Fluent)', 'German (Foundational)' // Languages [cite: 10]
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