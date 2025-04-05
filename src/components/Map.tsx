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
      });

      new google.maps.Marker({
        position: userLocation,
        map: mapInstance.current!,
        title: 'You are here!',
      });
    };

    const handleError = () => {
      mapInstance.current = new window.google.maps.Map(mapRef.current!, {
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
