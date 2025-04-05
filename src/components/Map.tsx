import { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 14,
      });
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: 'calc(100% - var(--ion-safe-area-bottom))',
      }}
    />
  );
};

export default Map;
