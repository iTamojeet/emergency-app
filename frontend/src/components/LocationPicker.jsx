import { useState } from 'react';
import './LocationPicker.css';

const LocationPicker = ({ onLocationSelect }) => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAutoDetect = async () => {
    setLoading(true);
    setError('');
    
    try {
      if ("geolocation" in navigator) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        const locationString = `${latitude}, ${longitude}`;
        setLocation(locationString);
        onLocationSelect(locationString);
      } else {
        setError("Location detection not supported in your browser");
      }
    } catch (err) {
      setError("Failed to detect location. Please enter manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    onLocationSelect(value);
  };

  return (
    <div className="location-picker">
      <div className="location-input">
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location or use auto-detect"
          required
        />
        <button 
          type="button" 
          className="auto-detect-btn"
          onClick={handleAutoDetect}
          disabled={loading}
        >
          {loading ? 'Detecting...' : '📍 Auto-Detect'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LocationPicker; 