import React from 'react';
// No direct import of App.css needed as styling will be handled by Tailwind CSS classes

function Journey() {
  const journeyEvents = [
    {
      year: 'Until 2019',
      title: 'Formative Years in Belgium',
      description: 'Foundational education and early experiences, including being a six-time semi-finalist of the Mathematical Olympiad of Belgium.',
      icon: '🏠'
    },
    {
      year: '2019-2022',
      title: 'Bachelor at Maastricht University',
      description: 'B.Sc. in Econometrics and Operations Research, graduating Summa Cum Laude. Included relevant coursework in diverse statistical and mathematical methods and tools, economic and finance theories. Also participated in a study abroad at UCLA and the Bachelor Honours programme.',
      icon: '🎓'
    },
    {
      year: 'Sept-Dec 2023',
      title: 'Supervisory Technology Trainee at ECB',
      description: 'Contributed to shaping the future of European banking supervision by applying cutting-edge technologies in Frankfurt am Main, Germany.',
      icon: '🏢'
    },
    {
      year: '2022-2024',
      title: 'Master at ETH Zürich',
      description: 'M.Sc. in Statistics with a distinction. Relevant coursework included Deep learning, Statistical methods, and Reinforcement learning.',
      icon: '🔬'
    },
    {
      year: 'Oct 2024 - Sept 2025', // Assuming until PhD start
      title: 'Research Engineer at INRIA',
      description: 'Working at INRIA - PreMeDICAL in Montpellier, France, with a research focus on missing data imputation and classification with incomplete datasets.',
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
    // Main section container with responsive padding, background, and text color
    <section id="journey" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      {/* Section title */}
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700 leading-tight tracking-tight">
        My Journey
      </h2>

      {/* Timeline container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line for the timeline (hidden on small screens, visible on medium and up) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-blue-400 h-full rounded-full"></div>

        {journeyEvents.map((event, index) => (
          <div
            key={index}
            // Conditional classes for left/right alignment on desktop, always centered on mobile
            className={`mb-8 flex items-center w-full relative ${
              index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            }`}
          >
            {/* Left side content for desktop, always present for mobile */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <div
                className={`bg-white p-7 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-200 relative ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
              >
                {/* Icon for the event */}
                <span className="text-3xl mb-4 block text-center md:inline-block md:mb-0 md:mr-4">
                  {event.icon}
                </span>
                {/* Event title */}
                <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-2 md:mt-0 leading-snug">{event.title}</h3>
                {/* Event year */}
                <h4 className="text-lg font-medium text-gray-700 mb-3 tracking-wide">{event.year}</h4>
                {/* Event description */}
                <p className="text-gray-800 leading-relaxed text-base">{event.description}</p>
              </div>
            </div>


            {/* Right side content for desktop (empty for left-aligned items on desktop) */}
            <div className="hidden md:block w-1/2"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Journey;
