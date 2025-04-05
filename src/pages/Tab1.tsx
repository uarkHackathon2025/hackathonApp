import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useState } from 'react';
import Map from '../components/Map';
import PendingScreen from '../components/PendingScreen';
import WaitingScreen from '../components/WaitingScreen';

const Tab1: React.FC = () => {
  const [appState, setAppState] = useState<'normal' | 'pending' | 'waiting'>('normal');
  const [showImage, setShowImage] = useState(false); // State to control image visibility

  const openImage = () => {
    setShowImage(true); // Show the image when the button is clicked
  };

  const closeImage = () => {
    setShowImage(false); // Close the image when clicked
  };

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
          {(appState === 'normal' || appState === 'pending') && <Map />}
          {appState === 'pending' && <PendingScreen />}
          {appState === 'waiting' && <WaitingScreen />}

          {/* Image Popup */}
          {showImage && (
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
              <img   //below is where you need to paste the image from delivery driver
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbiEJuEpcm7Oa6cP3WyuuF4W_yVJtzybDu2w&s" // Replace this with your image source
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
