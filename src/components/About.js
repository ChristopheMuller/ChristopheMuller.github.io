import React, { useState } from 'react';

function About() {
  // Removed state for summary, isLoading, and error as Gemini API integration is removed

  return (
    // The main section for the About Me content
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* Section title */}
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-800 leading-tight">
        About Me
      </h2>

      {/* Container for the main content paragraphs */}
      <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
        {/* First paragraph: Introduction and expertise */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          I am a statistics researcher working with <a href="https://juliejosse.com/" target="_blank">Julie Josse</a>, <a href="https://erwanscornet.github.io/" target="_blank">Erwan Scornet</a> and <a href="https://jeffnaef.github.io/" target="_blank">Jeffrey Näf</a> on missing data imputation and classification with incomplete datasets, as part of the INRIA <a href="https://team.inria.fr/premedical/" target="_blank">PreMeDICaL</a> team.
        </p>

        {/* Second paragraph: Current role */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          
        </p>

        {/* Third paragraph: Academic journey */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          My academic journey includes a Bachelor's in Econometrics and Operations Research from Maastricht University, and a Master's in Statistics from ETH Zürich. I've also had the privilege of studying abroad at UCLA.
        </p>

        {/* Fourth paragraph: Professional experience */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          Previously, I contributed to the future of European banking supervision with new technologies as a trainee at the European Central Bank and worked as a Junior Data Analyst at Hornet, a queer social network.
        </p>

        {/* Fifth paragraph: Future plans (PhD) */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          In September 2025, I will begin my DPhil (PhD) in Statistics at the University of Oxford, where I will be researching Causality under the supervision of <a href="https://www.stats.ox.ac.uk/~evans/" target="_blank">Robin Evans</a>.   
        </p>

      </div>
    </section>
  );
}

export default About;
