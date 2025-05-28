import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import L from 'leaflet'; // Import Leaflet library itself

// Fix for default marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


function MapComponent() {
  // Coordinates for your journey locations
  const locations = [
    { position: [50.4283, 6.0263], name: 'Malmedy, Belgium', description: 'Formative Years' }, // Malmedy, Belgium
    { position: [50.8514, 5.6909], name: 'Maastricht, The Netherlands', description: 'Bachelor at Maastricht University (2019-2022)' },
    { position: [50.1109, 8.6821], name: 'Frankfurt am Main, Germany', description: 'Supervisory Technology Trainee at ECB (Sept-Dec 2023)' },
    { position: [47.3769, 8.5417], name: 'Zürich, Switzerland', description: 'Master at ETH Zürich (2022-2024)' },
    { position: [43.6108, 3.8767], name: 'Montpellier, France', description: 'Research Engineer at INRIA (Oct 2024 - Sept 2025)' },
    { position: [51.7520, -1.2577], name: 'Oxford, UK', description: 'DPhil (PhD) in Statistics at University of Oxford (Sept 2025 - onwards)' },
  ];

  // Set a center for the map that covers your journey
  const mapCenter = [48.8566, 2.3522]; // Roughly central Europe (Paris)
  const defaultZoom = 5;

  return (
    <section id="map-section" className="map-section">
      <h2>My Global Journey</h2>
      <MapContainer center={mapCenter} zoom={defaultZoom} scrollWheelZoom={false} className="leaflet-map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, index) => (
          <Marker key={index} position={loc.position}>
            <Popup>
              <strong>{loc.name}</strong><br />
              {loc.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default MapComponent;