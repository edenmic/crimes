import React from 'react';
import type { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import type { Crime } from '../../types';
import styles from './CrimeMap.module.css';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CrimeMapProps {
  crimes: Crime[];
  title: string;
}

export const CrimeMap: FC<CrimeMapProps> = ({ crimes, title }) => {
  // Center on Boston
  const bostonPosition: [number, number] = [42.3601, -71.0589];

  // Filter out crimes without valid coordinates
  const validCrimes = crimes.filter(
    crime => 
      crime.latitude && 
      crime.longitude && 
      !isNaN(crime.latitude) && 
      !isNaN(crime.longitude)
  );

  return (
    <div className={styles.mapContainer}>
      <h3>{title}</h3>
      <MapContainer 
        center={bostonPosition} 
        zoom={12} 
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Use circle markers for better performance with large datasets */}
        {validCrimes.slice(0, 1000).map((crime) => (
          <CircleMarker
            key={crime.incidentNumber}
            center={[crime.latitude, crime.longitude]}
            radius={5}
            pathOptions={{ color: getColorByOffense(crime.offenseCode) }}
          >
            <Popup>
              <div>
                <h4>{crime.offenseCode}</h4>
                <p>{crime.offenseDescription}</p>
                <p>District: {crime.district}</p>
                <p>Date: {new Date(crime.occuredOnDate).toLocaleDateString()}</p>
                <p>Location: {crime.street}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

// Helper function to get color based on offense type
function getColorByOffense(offense: string): string {
  const colorMap: Record<string, string> = {
    'Auto Theft': '#ff4d4d',
    'Vandalism': '#ff944d',
    'Simple Assault': '#ffdb4d',
    'Residential Burglary': '#79ff4d',
    'Harassment': '#4dffdb',
    'Investigate Property': '#4d94ff',
    'Investigate Person': '#8c4dff',
    'Motor Vehicle Accident Response': '#db4dff',
    'Violations': '#ff4d94',
  };
  
  return colorMap[offense] || '#808080';
}