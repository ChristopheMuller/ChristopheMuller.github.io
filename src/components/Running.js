// src/components/GoogleChartEmbed.js
import React from 'react';

function GoogleChartEmbed() {
  const chartEmbedUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJ1ZMnDnBw8x2gKnnK5zK2TXrqobszVYev5jEqharymVKm64-lDFz4vwnXa0u6vnVem3NWqkQOB8h3/pubchart?oid=1758099136&format=interactive&h=500";

  return (
    <section id="google-chart" className="my-0 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-0 text-purple-800 leading-tight">
          My 1000km Goal Progress
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-0">
          My goal for this year is to reach 1000 km. Below, you'll find a plot showing my accumulated kilometers over time.
        </p>
        <div className="max-w-xl mx-auto my-0" style={{ height: '300px'}}> {/* Set a fixed height for the container and center it */}
          <iframe
            width="65%"
            frameBorder="0"
            src={chartEmbedUrl}
            title="Embedded Google Sheet Chart: Kilometers over Date"
            style={{ height: '100%' }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default GoogleChartEmbed;
