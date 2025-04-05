
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, } from '@ionic/react';
import './Tab3.css';
import {personOutline, notificationsOutline, cardOutline, pin, receiptOutline, speedometerOutline, camera } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import AccountInfo from './AccountInfo'; //settings->accountinfo
import Notifications from './Notifications'; //settings->notifications
import Payment from './Payment'; //settings->payment
import History from './History'; //settings->history
import Driver from './Driver'; //settings->driver

const Tab3: React.FC = () => {
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
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton expand="block" href="/tabs/AccountInfo">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={personOutline}/>
          Account Info
        </IonButton> {/* Account Info Button*/}
        <IonButton expand="block" href="/tabs/Notifications">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={notificationsOutline}/>
          Notifications
        </IonButton> {/* Notifications Button*/}
        <IonButton expand="block" href="/tabs/Payment">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={cardOutline}/>
          Payment
        </IonButton> {/* Payment Button*/}
        <IonButton expand="block">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={pin}/>
          Location Services
        </IonButton> {/* Location Button*/}
        <IonButton expand="block">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={camera}/>
          Camera Permissions
        </IonButton> {/* Camera Button*/}
        <IonButton expand="block" href="/tabs/History">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={receiptOutline}/>
          History
        </IonButton> {/* History Button*/}
        <IonButton expand="block" href="/tabs/Driver">
          <IonIcon aria-hidden="true" size="large" slot="start" icon={speedometerOutline}/>
          Driver
        </IonButton> {/* Driver Button*/}
      </IonContent>

      {/* Sub-pages for settings (Not tabs) */}
      <Route exact path="/tabs/AccountInfo" component={AccountInfo} />
      <Route exact path="/tabs/Notifications" component={Notifications} />
      <Route exact path="/tabs/Payment" component={Payment} />
      <Route exact path="/tabs/History" component={History} />
      <Route exact path="/tabs/Driver" component={Driver} />
    </IonPage>
  );
};

export default Tab3;

