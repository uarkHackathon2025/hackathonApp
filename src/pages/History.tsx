
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import './History.css';
import {} from 'ionicons/icons';

const History: React.FC = () => {
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
            <IonTitle>History</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default History;

