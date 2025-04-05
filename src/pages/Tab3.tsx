
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import './Tab3.css';
import {personOutline, notificationsOutline, cardOutline, locationOutline, receiptOutline, speedometerOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
          <IonButton expand="block">
            <IonIcon aria-hidden="true" size="large" slot="start" icon={personOutline}/>
            Account Info
          </IonButton> {/* Account Info Button*/}
          <IonButton expand="block">
            <IonIcon aria-hidden="true" size="large" slot="start" icon={notificationsOutline}/>
            Notifications
          </IonButton> {/* Notifications Button*/}
          <IonButton expand="block">
            <IonIcon aria-hidden="true" size="large" slot="start" icon={cardOutline}/>
            Payment
          </IonButton> {/* Payment Button*/}
          <IonButton expand="block">
            <IonIcon aria-hidden="true" size="large" slot="start" icon={locationOutline}/>
            Location Services
          </IonButton> {/* Location Button*/}
          <IonButton expand="block">
            <IonIcon aria-hidden="true" size="large" slot="start" icon={receiptOutline}/>
            History
          </IonButton> {/* History Button*/}
          <IonButton expand="block">
            <IonIcon aria-hidden="true" size="large" slot="start" icon={speedometerOutline}/>
            Driver
          </IonButton> {/* Driver Button*/}
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

