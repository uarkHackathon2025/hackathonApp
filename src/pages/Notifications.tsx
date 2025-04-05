import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonToggle } from '@ionic/react';
import './Notifications.css';

const Notifications: React.FC = () => {
  // State to hold the toggle values
  const [textNotifications, setTextNotifications] = useState<boolean>(false);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(false);
  const [pushNotifications, setPushNotifications] = useState<boolean>(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
        <div style={{
          height: '26px',
          width: '100%',
          backgroundColor: 'black',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
          //padding: '5px 5px'
        }}></div>
        <IonToolbar style={{ marginTop: '24px' }}>
            {/* Use IonButtons to place the back button on the left side */}
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/tab3" />
            </IonButtons>
            <IonTitle>Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Notification Toggle Options */}
        <IonContent className="ion-padding">
          {/* Text Notifications Toggle */}
          <IonItem>
            <IonLabel>Text Notifications</IonLabel>
            <IonToggle 
              slot="end" 
              checked={textNotifications} 
              onIonChange={e => setTextNotifications(e.detail.checked)} 
            />
          </IonItem>

          {/* Email Notifications Toggle */}
          <IonItem>
            <IonLabel>Email Notifications</IonLabel>
            <IonToggle 
              slot="end" 
              checked={emailNotifications} 
              onIonChange={e => setEmailNotifications(e.detail.checked)} 
            />
          </IonItem>

          {/* Push Notifications Toggle */}
          <IonItem>
            <IonLabel>Push Notifications</IonLabel>
            <IonToggle 
              slot="end" 
              checked={pushNotifications} 
              onIonChange={e => setPushNotifications(e.detail.checked)} 
            />
          </IonItem>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
