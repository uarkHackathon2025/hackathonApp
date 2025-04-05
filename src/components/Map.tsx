import { useEffect, useRef } from 'react';

const Map: React.FC = () => {
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
        styles: [
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        mapTypeControl: false, // Optional: removes the map type toggle
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

      // Add custom POIs
      POIS.forEach(poi => {
        const marker = new google.maps.Marker({
          position: poi.position,
          map: mapInstance.current!,
          title: poi.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3 style="margin:0; color:#333;">${poi.name}</h3>
              <p style="margin:0; color:#333;">${poi.description}</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance.current!, marker);
        });
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
