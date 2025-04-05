import { useEffect, useRef } from 'react';

interface MapProps {
  orderLocation?: { latitude: number; longitude: number };
}

const Map: React.FC<MapProps> = ({ orderLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Force the map to resize when it's mounted
    const resizeMap = () => {
      if (mapInstance.current) {
        google.maps.event.trigger(mapInstance.current, 'resize');
        
        // If there's an orderLocation, recenter the map
        if (orderLocation) {
          const orderLatLng = { lat: orderLocation.latitude, lng: orderLocation.longitude };
          mapInstance.current.setCenter(orderLatLng);
        }
      }
    };

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
        fullscreenControl: true,
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

      // If there's an orderLocation, center the map on that and add a marker
      if (orderLocation) {
        const orderLatLng = { lat: orderLocation.latitude, lng: orderLocation.longitude };
        
        // Center the map to the order location
        mapInstance.current.setCenter(orderLatLng);

        // Add a marker for the order location
        new google.maps.Marker({
          position: orderLatLng,
          map: mapInstance.current!,
          title: 'Order Location',
          animation: google.maps.Animation.DROP,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          }
        });
      }
      
      // Force a resize after the map is created
      setTimeout(resizeMap, 300);
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

    // Add event listener for window resize
    window.addEventListener('resize', resizeMap);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeMap);
    };
  }, [orderLocation]); // Re-run when orderLocation changes

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};

export default Map;