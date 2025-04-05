import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useState, useEffect } from 'react';
import Map from '../components/Map';
import PendingScreen from '../components/PendingScreen';
import WaitingScreen from '../components/WaitingScreen';
import { db } from './firebase'; // Assuming Firebase is set up
import { doc, getDoc } from 'firebase/firestore';

const Tab1: React.FC = () => {
  const [appState, setAppState] = useState<'normal' | 'pending' | 'waiting'>('normal');
  const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showImage, setShowImage] = useState(false); // State to control image visibility
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const openImage = () => {
    setShowImage(true); // Show the image when the button is clicked
  };

  const closeImage = () => {
    setShowImage(false); // Close the image when clicked
  };

  useEffect(() => {
    // Fetch order details from Firebase (you can replace 'orderId' with the actual order ID you want to fetch)
    const fetchOrderDetails = async () => {
      const orderDocRef = doc(db, "orders", "orderId"); // Replace with your order ID
      const orderDoc = await getDoc(orderDocRef);
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        if (orderData?.location) {
          setOrderLocation(orderData.location);
        }
        if (orderData?.photoURL) {
          setPhotoURL(orderData.photoURL); // Store the photo URL for later use
        }
      }
    };
    fetchOrderDetails();
  }, []); // Empty dependency array to only fetch on mount

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Container for relative positioning */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          
          {/* View Image Button */}
          <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
            <IonButton 
              size="large" 
              color="success" 
              onClick={openImage}
            >
              View Image
            </IonButton>
          </div>
          
          {/* 🧪 Test buttons – easily removable */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
            <IonButton size="small" onClick={() => setAppState('normal')}>Normal</IonButton>
            <IonButton size="small" color="warning" onClick={() => setAppState('pending')}>Pending</IonButton>
            <IonButton size="small" color="success" onClick={() => setAppState('waiting')}>Waiting</IonButton>
          </div>

          {/* Main content */}
          {(appState === 'normal' || appState === 'pending') && orderLocation && <Map orderLocation={orderLocation} />}
          {appState === 'pending' && <PendingScreen />}
          {appState === 'waiting' && <WaitingScreen />}

          {/* Image Popup */}
          {showImage && photoURL && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background to overlay the content
              zIndex: 10000, // Make sure it's on top of everything
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} onClick={closeImage}>
              <img
                src={photoURL} // Displaying the photo from Firebase
                alt="Popup"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
              />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
