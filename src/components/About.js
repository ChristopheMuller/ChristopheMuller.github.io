import React from 'react';

function About() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-800 leading-tight">
        About Me
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          I am currently a DPhil (PhD) student in Statistics at the University of Oxford. I am fortunate to be researching Causality under the supervision of <a href="https://www.stats.ox.ac.uk/~evans/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Robin Evans</a>, as part of the <a href="https://www.statml.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">StatML CDT</a>.
        </p>

        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          My academic journey includes a Bachelor's in Econometrics and Operations Research from Maastricht University, and a Master's in Statistics from ETH Zürich. I've also had the privilege of studying abroad at UCLA.
        </p>

        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          Prior to my DPhil, I was a statistics researcher working with <a href="https://juliejosse.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Julie Josse</a>, <a href="https://erwanscornet.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Erwan Scornet</a> and <a href="https://jeffnaef.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Jeffrey Näf</a> on missing data imputation and classification with incomplete datasets, as part of the INRIA <a href="https://team.inria.fr/premedical/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PreMeDICaL</a> team.
        </p>

        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          My other professional experience includes contributing to the future of European banking supervision as a trainee at the European Central Bank and working as a Junior Data Analyst at Hornet, a queer social network.
        </p>
      </div>
    </section>
  );
}

export default About;