// src/components/MusicStats.js
import React from 'react';

function MusicStats() {
  return (
    <section id="music-stats" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-800 leading-tight">
          My Music Taste
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          I've been tracking all the music I listen to via Last.fm since January 2022.
          You can explore the detailed stats of my listening habits here:
        </p>
        <a
          href="https://lastfmstats.com/user/mullerchris21/dataset"
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer" // Recommended for security when using target="_blank"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-md
                     hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out
                     transform hover:-translate-y-1"
        >
          View Last.fm Stats
        </a>
      </div>
    </section>
  );
}

export default MusicStats;