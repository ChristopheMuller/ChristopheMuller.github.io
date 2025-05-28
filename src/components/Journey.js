import React from 'react';
import '../App.css';

function Journey() {
  const journeyEvents = [
    {
      year: 'Until 2019',
      title: 'Formative Years in Belgium',
      description: 'Foundational education and early experiences, including being a six-time semi-finalist of the Mathematical Olympiad of Belgium. [cite: 11]',
      icon: '🏠'
    },
    {
      year: '2019-2022',
      title: 'Bachelor at Maastricht University',
      description: 'B.Sc. in Econometrics and Operations Research, graduating Summa Cum Laude. [cite: 3] Included relevant coursework in diverse statistical and mathematical methods and tools, economic and finance theories. [cite: 3] Also participated in a study abroad at UCLA and the Bachelor Honours programme. [cite: 4]',
      icon: '🎓'
    },
    {
      year: 'Sept-Dec 2023',
      title: 'Supervisory Technology Trainee at ECB',
      description: 'Contributed to shaping the future of European banking supervision by applying cutting-edge technologies in Frankfurt am Main, Germany. [cite: 6]',
      icon: '🏢'
    },
    {
      year: '2022-2024',
      title: 'Master at ETH Zürich',
      description: 'M.Sc. in Statistics with a distinction. [cite: 1, 2] Relevant coursework included Deep learning, Statistical methods, and Reinforcement learning. [cite: 1]',
      icon: '🔬'
    },
    {
      year: 'Oct 2024 - Sept 2025', // Assuming until PhD start
      title: 'Research Engineer at INRIA',
      description: 'Working at INRIA - PreMeDICAL in Montpellier, France, with a research focus on missing data imputation and classification with incomplete datasets. [cite: 5]',
      icon: '💻'
    },
    {
      year: 'Sept 2025 - onwards',
      title: 'DPhil (PhD) in Statistics at Oxford',
      description: 'Commencing doctoral studies in Statistics at the University of Oxford, focusing on advanced research.',
      icon: '📚'
    }
  ];

  return (
    <section id="journey" className="journey-section">
      <h2>My Journey</h2>
      <div className="timeline-container">
        {journeyEvents.map((event, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <span className="timeline-icon">{event.icon}</span>
              <h3>{event.title}</h3>
              <h4>{event.year}</h4>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Journey;