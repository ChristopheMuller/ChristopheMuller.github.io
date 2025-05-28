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
          I'm Christophe, a dedicated professional with a strong academic background in Statistics and Econometrics.
          My expertise lies in applying diverse statistical and mathematical methods and tools to real-world challenges, with a focus on machine learning, statistical modeling, and data analysis.
        </p>

        {/* Second paragraph: Current role */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          Currently, I'm working as a Research Engineer at INRIA - PreMeDICAL, focusing on missing data imputation and classification with incomplete datasets.
        </p>

        {/* Third paragraph: Academic journey */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          My academic journey includes a Bachelor's in Econometrics and Operations Research from Maastricht University (GPA: 9.37/10, Summa Cum Laude), and a Master's in Statistics from ETH Zürich (GPA: 5.75/6, Distinction). I've also had the privilege of studying abroad at UCLA and participating in the Bachelor Honours programme at Maastricht University.
        </p>

        {/* Fourth paragraph: Professional experience */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          I have experience contributing to the future of European banking supervision through cutting-edge technologies during my traineeship at the European Central Bank. I've also undertaken data-based projects to improve app user and revenue growth as a Junior Data Analyst at Hornet, Queer Social Network.
        </p>

        {/* Fifth paragraph: Future plans (PhD) */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          In September 2025, I will embark on my DPhil (PhD) in Statistics at the University of Oxford, eager to delve deeper into advanced research.
        </p>

        {/* Sixth paragraph: Hobbies and personal achievements */}
        <p className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          Outside of my professional pursuits, I am a six-time semi-finalist of the Mathematical Olympiad of Belgium and enjoy discovering citizen and political life through the Communal Council of Children. I also enjoy hiking, playing the piano, and learning new languages.
        </p>
      </div>
    </section>
  );
}

export default About;
