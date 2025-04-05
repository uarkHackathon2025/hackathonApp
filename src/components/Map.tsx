import { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    const fallback = { lat: 37.7749, lng: -122.4194 };

    const initMap = (position: GeolocationPosition) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      mapInstance.current = new window.google.maps.Map(mapRef.current!, {
        center: userLocation,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
      });

      // Draw a circle around user's location
      new google.maps.Circle({
        center: userLocation,
        radius: 50, // radius in meters
        map: mapInstance.current!,
        fillColor: '#4285F4',
        fillOpacity: 0.35,
        strokeColor: '#0d47a1',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
    };

    const handleError = () => {
      mapInstance.current = new google.maps.Map(mapRef.current!, {
        center: fallback,
        zoom: 12,
      });
    };

    navigator.geolocation.getCurrentPosition(initMap, handleError, {
      enableHighAccuracy: true,
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Map;

