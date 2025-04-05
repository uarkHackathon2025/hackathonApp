
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import './Notifications.css';
import {} from 'ionicons/icons';

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            {/* Use IonButtons to place the back button on the left side */}
            <IonButtons slot="start">
                <IonBackButton defaultHref="/tabs/tab3" />
            </IonButtons>
            <IonTitle>Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;

