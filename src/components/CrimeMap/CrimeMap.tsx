import type { FC } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useTheme } from '../../contexts/ThemeContext';
import type { Crime } from '../../types';
import styles from './CrimeMap.module.css';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';    
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
  const { darkMode } = useTheme();
  
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

  // Implement pagination or virtualization for map points
  const MAX_MAP_POINTS = 1000;
  const displayCrimes = useMemo(() => {
    return validCrimes.slice(0, MAX_MAP_POINTS);
  }, [validCrimes]);

  // Use a dark or light map tile based on theme
  const tileUrl = darkMode 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  
  const attribution = darkMode
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className={styles.mapContainer}>
      <h3 className={styles.mapTitle}>{title}</h3>
      <MapContainer 
        center={bostonPosition} 
        zoom={12} 
        className={styles.map}
      >
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {/* Use circle markers for better performance with large datasets */}
        {displayCrimes.map((crime, index) => (
          <CircleMarker
            key={`${crime.incidentNumber}-${index}`}
            center={[crime.latitude, crime.longitude]}
            radius={5}
            pathOptions={{ color: getColorByOffense(crime.offenseCode, darkMode) }}
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

// Update color function to support dark mode
const getColorByOffense = (offenseCode: string, isDarkMode: boolean) => {
  const colorMap: Record<string, string> = {
    'Auto Theft': isDarkMode ? '#ff4d4d' : '#ffcccc',
    'Vandalism': isDarkMode ? '#ff944d' : '#ffe6cc',
    'Simple Assault': isDarkMode ? '#ffdb4d' : '#ffffcc',
    'Residential Burglary': isDarkMode ? '#79ff4d' : '#e6ffe6',
    'Harassment': isDarkMode ? '#4dffdb' : '#ccffff',
    'Investigate Property': isDarkMode ? '#4d94ff' : '#cce0ff',
    'Investigate Person': isDarkMode ? '#8c4dff' : '#e0ccff',
    'Motor Vehicle Accident Response': isDarkMode ? '#db4dff' : '#f2ccff',
    'Violations': isDarkMode ? '#ff4d94' : '#ffccf2',
  };
  
  return colorMap[offenseCode] || (isDarkMode ? '#808080' : '#f2f2f2');
};