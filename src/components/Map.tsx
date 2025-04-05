import { useEffect, useRef } from 'react';

interface MapProps {
  orderLocation?: { latitude: number; longitude: number };
}

const Map: React.FC<MapProps> = ({ orderLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const POIS = [
    {
      name: 'Old Main',
      position: { lat: 36.06870, lng: -94.17170 },
      description: 'The University of Arkansas’ most well-known and beloved building was completed in 1875. It is now home to the Fulbright College of Arts and Sciences.',
    },
    {
      name: 'Greek Theatre',
      position: { lat: 36.06725885343986, lng: -94.1738420400243 },
      description: 'The Chi Omega Greek Theatre is a structure on the University of Arkansas campus in Fayetteville, Arkansas. It was a gift to the university from Chi Omega, and it was completed in 1930.',
    },
    {
      name: 'Mullins Library',
      position: { lat: 36.06867724282907,  lng: -94.1738338075425},
      description: 'The David W. Mullins Library is the main research library of the University of Arkansas. WOW',
    },

    {
      name: 'JBHT Room 216',
      position: { lat: 36.065956788234566,   lng: -94.17381376824899},
      description: 'A large audience is here right now. Maybe you should take a peek.',
    },

    {
      name: 'The Arkansas Union',
      position: { lat:  36.06869053180468,  lng: -94.17596564471599},
      description: 'The center of campus life and activity at the University of Arkansas. They also have a chick fil a here.',
    },

    {
      name: 'The University Recreation Center',
      position: { lat:  36.064546607400125,  lng: -94.17798964832427},
      description: 'The HPER Complex is a multipurpose facility on the campus of the University of Arkansas. Built in 1984, it is designed to house the entire Health Science, Kinesiology, Recreation, and Dance programs.',
    },

     
  ]; 
  
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

      // Circle around user
      new google.maps.Circle({
        center: userLocation,
        radius: 402, // a quarter mile in meters
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
