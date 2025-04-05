import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import Map from '../components/Map';
import { IonButton } from '@ionic/react';
import PendingScreen from '../components/PendingScreen';
import WaitingScreen from '../components/WaitingScreen';

const Tab1: React.FC = () => {
  const [appState, setAppState] = useState<'normal' | 'pending' | 'waiting'>('normal');

  // useEffect(() => {
  //   if (appState === 'normal') {
  //     const timeout = setTimeout(() => setAppState('pending'), 3000);
  //     return () => clearTimeout(timeout);
  //   }

  //   if (appState === 'pending') {
  //     const timeout = setTimeout(() => setAppState('waiting'), 5000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [appState]);

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
      </div>
    </IonContent>
    </IonPage>
    
  );
};

export default Tab1;