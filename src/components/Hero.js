import React from 'react';

function Hero() {
  return (
    // Main hero section with a gradient background, full height, and centered content
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background overlay for visual effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 opacity-90"></div>
      
      {/* Content container, centered and with max width for readability */}
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Main heading with large, bold text and shadow */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg animate-fade-in-up">
          Hi, I'm Christophe Muller!
        </h1>
        {/* Sub-heading with slightly smaller text */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 text-blue-200 animate-fade-in-up delay-100">
          Research Engineer at INRIA & Future DPhil Student at Oxford
        </h2>
        {/* Descriptive paragraph */}
        <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
          {/* not sure what to include here yet  */}
        </p>
      </div>

      {/* Optional: Add a subtle animation or pattern for background visual interest */}
      {/* For example, a simple SVG pattern or a particle effect could go here */}
    </section>
  );
}

export default Hero;
