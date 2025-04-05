
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import './Payment.css';
import {} from 'ionicons/icons';

const Payment: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            {/* Use IonButtons to place the back button on the left side */}
            <IonButtons slot="start">
                <IonBackButton defaultHref="/tabs/tab3" />
            </IonButtons>
            <IonTitle>Payment</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Payment;

