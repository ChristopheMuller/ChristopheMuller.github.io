import React from 'react';
import '../App.css';

const journeyEvents = [
  {
    year: 'Sept 2025 - onwards',
    title: 'DPhil in Statistics at Oxford',
    description: 'Commencing doctoral studies in Statistics at the University of Oxford, working on generalization in causal inference.',
    icon: '🇬🇧'
  },
  {
    year: 'Oct 2024 - Sept 2025',
    title: 'Research Engineer at INRIA',
    description: 'Working at INRIA - PreMeDICAL in Montpellier, France, with a research focus on missing data imputation and classification with missing data.',
    icon: '🇫🇷'
  },
  {
    year: '2022-2024',
    title: 'Master at ETH Zürich',
    description: 'M.Sc. in Statistics with a distinction: Statistical methods, Deep Learning and Reinforcement Learning.',
    icon: '🇨🇭'
  },
  {
    year: 'Sept-Dec 2023',
    title: 'Supervisory Technology Trainee at ECB',
    description: 'Contributed to shaping the future of European banking supervision in Frankfurt, Germany.',
    icon: '🇩🇪'
  },
  {
    year: '2019-2022',
    title: 'Bachelor at Maastricht University',
    description: 'B.Sc. in Econometrics and Operations Research, graduating Summa Cum Laude.',
    icon: '🇳🇱'
  },
  {
    year: 'Until 2019',
    title: 'Formative Years in Belgium',
    description: 'Foundational education and early experiences, including being a six-time semi-finalist of the Mathematical Olympiad of Belgium.',
    icon: '🇧🇪'
  }
];

function Journey() {
  return (
    <section id="journey" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">My Journey</h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full rounded-full"></div>
        {journeyEvents.map((event, index) => (
          <div key={index} className={`mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl mb-2">{event.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{event.year}</div>
                <div className="text-xl font-semibold text-gray-700 mt-1">{event.title}</div>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Journey;
