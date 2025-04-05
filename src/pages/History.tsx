
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import './History.css';
import {} from 'ionicons/icons';

const History: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
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

