import React from 'react';
import { Geolocation } from '@capacitor/geolocation';


const HintButton: React.FC<{ deliveryLocation: { lat: number; lng: number } }> = ({ deliveryLocation }) => {

    const getCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        return {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        };
      };


      // calculates distance between two positions
      const haversineDistance = (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
        const toRad = (x: number) => x * Math.PI / 180;
      
        const R = 6371; // Earth radius in km
        const dLat = toRad(end.lat - start.lat);
        const dLng = toRad(end.lng - start.lng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(start.lat)) *
            Math.cos(toRad(end.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // distance in km
      };

    // calculates angle between two positions
      const calculateBearing = (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
        const toRad = (deg: number) => deg * Math.PI / 180;
        const toDeg = (rad: number) => rad * 180 / Math.PI;
      
        const lat1 = toRad(start.lat);
        const lat2 = toRad(end.lat);
        const dLng = toRad(end.lng - start.lng);
      
        const y = Math.sin(dLng) * Math.cos(lat2);
        const x =
          Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
        const bearing = toDeg(Math.atan2(y, x));
        return (bearing + 360) % 360; // in degrees
      };

      const compassDirection = (angle: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(angle / 45) % 8;
        return directions[index];
      };

    const showHint = async () => {
        const userLocation = await getCurrentPosition();
        const deliveryLocation = { lat: 40.7128, lng: -74.006 }; // replace with actual delivery location

        const distance = haversineDistance(userLocation, deliveryLocation);
        const angle = calculateBearing(userLocation, deliveryLocation);
        const direction = compassDirection(angle);

        // test message
        alert(`Your delivery is ${distance.toFixed(2)} km away to the ${direction} (${angle.toFixed(0)}°).`);


    }

    return (
      <button onClick={showHint} style={{ padding: '12px 20px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
        Show Delivery Hint
      </button>
    );
};

export default HintButton;
