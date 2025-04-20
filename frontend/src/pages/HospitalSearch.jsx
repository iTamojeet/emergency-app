import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, BuildingOffice2Icon, TruckIcon, HeartIcon } from '@heroicons/react/24/outline';
import './HospitalSearch.css';

const sampleHospitals = [
  {
    id: 1,
    name: 'Apollo Hospital',
    address: '58, Canal Circular Road, Kolkata - 700054',
    lat: 22.5726,
    lng: 88.3639,
    beds: 25,
    oxygen: true,
    ambulanceContact: '033-2320 3040',
    ambulanceNumber: 'AMB-001',
    firstAid: true
  },
  {
    id: 2,
    name: 'AMRI Hospital',
    address: '16/17, Gariahat Road, Kolkata - 700019',
    lat: 22.5204,
    lng: 88.3639,
    beds: 15,
    oxygen: true,
    ambulanceContact: '033-6680 0000',
    ambulanceNumber: 'AMB-002',
    firstAid: true
  },
  {
    id: 3,
    name: 'Fortis Hospital',
    address: '730, Anandapur, Kolkata - 700107',
    lat: 22.4964,
    lng: 88.4139,
    beds: 20,
    oxygen: true,
    ambulanceContact: '033-6628 4444',
    ambulanceNumber: 'AMB-003',
    firstAid: true
  }
];

const HospitalSearch = ({ hospitals = sampleHospitals, onNavigate = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredHospitals(hospitals);
      return;
    }

    const filtered = hospitals
      .map(hospital => {
        const distance = calculateDistance(
          hospital.lat,
          hospital.lng,
          22.5726,
          88.3639
        );
        return { ...hospital, distance };
      })
      .filter(hospital => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.distance - b.distance);

    setFilteredHospitals(filtered);
  }, [searchQuery, hospitals]);

  useEffect(() => {
    if (hospitals.length === 0) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is missing');
      return;
    }

    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.onerror = () => {
      console.error('Failed to load Google Maps script');
    };

    document.body.appendChild(script);

    return () => {
      markers.forEach(marker => marker.setMap(null));
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [hospitals]);

  const initializeMap = () => {
    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 22.5726, lng: 88.3639 },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });
      setMap(mapInstance);

      const newMarkers = hospitals.map((hospital) => {
        const marker = new window.google.maps.Marker({
          position: { lat: hospital.lat, lng: hospital.lng },
          map: mapInstance,
          title: hospital.name,
          animation: window.google.maps.Animation.DROP
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 10px 0;">${hospital.name}</h3>
              <p style="margin: 0;"><strong>Beds:</strong> ${hospital.beds}</p>
              <p style="margin: 0;"><strong>Oxygen:</strong> ${hospital.oxygen ? 'Available' : 'Unavailable'}</p>
              <p style="margin: 10px 0 0 0;"><strong>Address:</strong> ${hospital.address}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });

        return { marker, infoWindow, hospital };
      });
      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    
    // Find the marker for this hospital
    const markerObj = markers.find(m => m.hospital.id === hospital.id);
    if (markerObj && map) {
      // Center the map on the selected hospital
      map.panTo({ lat: hospital.lat, lng: hospital.lng });
      map.setZoom(15);
      
      // Close any open info windows
      markers.forEach(m => m.infoWindow.close());
      
      // Open this hospital's info window
      markerObj.infoWindow.open(map, markerObj.marker);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="hospital-search-container">
      <div className="content-grid">
        {/* Left Section - Search and List */}
        <div className="search-section">
          <h1 className="search-title">Get Help Instantly During Any Emergency</h1>
          <p className="search-subtitle">Find hospitals, register patients, or report critical cases in seconds.</p>
          
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <div className="search-bar">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search location manually"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-button primary">
              <span className="icon">🏥</span>
              Nearby Hospitals
            </button>
            <button className="action-button">
              <span className="icon">📝</span>
              Pre-register
            </button>
            <button className="action-button emergency">
              <span className="icon">🚨</span>
              Report Emergency
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button
              className={`filter-button ${selectedFilter === 'beds' ? 'active' : ''}`}
              onClick={() => handleFilterClick('beds')}
            >
              <BuildingOffice2Icon className="filter-button-icon" />
              General Beds
            </button>
            <button
              className={`filter-button ${selectedFilter === 'ambulance' ? 'active' : ''}`}
              onClick={() => handleFilterClick('ambulance')}
            >
              <TruckIcon className="filter-button-icon" />
              Ambulance
            </button>
            <button
              className={`filter-button ${selectedFilter === 'firstAid' ? 'active' : ''}`}
              onClick={() => handleFilterClick('firstAid')}
            >
              <HeartIcon className="filter-button-icon" />
              First Aid
            </button>
          </div>

          {/* Hospital Cards */}
          <div className="hospital-cards">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`hospital-card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedHospital?.id === hospital.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleHospitalClick(hospital)}
              >
                <div className="hospital-header">
                  <div>
                    <h3 className="hospital-name">{hospital.name}</h3>
                    <p className="hospital-info">Available Beds: {hospital.beds}</p>
                    <p className="hospital-info">
                      Ambulance Contact: {hospital.ambulanceContact || 'N/A'}
                    </p>
                    <p className="hospital-info">
                      Ambulance Number: {hospital.ambulanceNumber || 'N/A'}
                    </p>
                  </div>
                  {hospital.firstAid && (
                    <span className="first-aid-badge">
                      First Aid Available
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(hospital);
                  }}
                  className="navigate-button"
                >
                  Navigate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="map-container">
          <div ref={mapRef} className="map-view" />
        </div>
      </div>
    </div>
  );
};

export default HospitalSearch; 