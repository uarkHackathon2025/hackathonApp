import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useState, useEffect } from 'react';
import Map from '../components/Map'; // Assuming the map component is here
import PendingScreen from '../components/PendingScreen';
import WaitingScreen from '../components/WaitingScreen';
import { db } from './firebase'; // Assuming Firebase is set up
import { doc, getDoc } from 'firebase/firestore';

const Tab1: React.FC = () => {
  const [appState, setAppState] = useState<'normal' | 'pending' | 'waiting'>('normal');
  const [showImage, setShowImage] = useState(false);
  const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>("cJeYkq9leurLig8cDR2t"); // Set the actual order ID from your Firebase

  const openImage = () => {
    setShowImage(true);
  };

  const closeImage = () => {
    setShowImage(false);
  };

  useEffect(() => {
    // Fetch order details from Firebase using the orderId state
    const fetchOrderDetails = async () => {
      try {
        const orderDocRef = doc(db, "orders", orderId);
        const orderDoc = await getDoc(orderDocRef);
        
        if (orderDoc.exists()) {
          const orderData = orderDoc.data();
          console.log("Order data fetched:", orderData);
          
          // Set location if it exists
          if (orderData?.location) {
            setOrderLocation({
              latitude: orderData.location.latitude,
              longitude: orderData.location.longitude
            });
          }
          
          // Set photo URL if it exists
          if (orderData?.photoURL) {
            setPhotoURL(orderData.photoURL);
          }
        } else {
          console.error("Order document does not exist");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]); // Re-fetch if orderId changes

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order #{orderId}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Interface buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          {/* View Image Button */}
          <div>
            <IonButton 
              size="default" 
              color="success" 
              onClick={openImage}
              disabled={!photoURL}
            >
              View Order Photo
            </IonButton>
          </div>
          
          {/* Test buttons */}
          <div>
            <IonButton size="small" onClick={() => setAppState('normal')}>Normal</IonButton>
            <IonButton size="small" color="warning" onClick={() => setAppState('pending')}>Pending</IonButton>
            <IonButton size="small" color="success" onClick={() => setAppState('waiting')}>Waiting</IonButton>
          </div>
        </div>
        
        {/* Main content area */}
        <div style={{ 
          width: '100%', 
          height: 'calc(100% - 60px)', // Adjust height to account for buttons
          position: 'relative'
        }}>
          {/* Map component */}
          {(appState === 'normal' || appState === 'pending') && orderLocation && (
            <div style={{ 
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}>
              <Map orderLocation={orderLocation} />
            </div>
          )}
          
          {/* Overlay screens */}
          {appState === 'pending' && <PendingScreen />}
          {appState === 'waiting' && <WaitingScreen />}
        </div>

        {/* Image Popup */}
        {showImage && photoURL && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }} onClick={closeImage}>
            <img
              src={photoURL}
              alt="Order Photo"
              style={{
                maxWidth: '90%',
                maxHeight: '80%',
                objectFit: 'contain',
                borderRadius: '10px',
              }}
            />
            <div style={{ 
              color: 'white', 
              marginTop: '1rem', 
              fontSize: '0.8rem',
              textAlign: 'center',
              maxWidth: '90%'
            }}>
              Order location: {orderLocation?.latitude.toFixed(6)}, {orderLocation?.longitude.toFixed(6)}
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;