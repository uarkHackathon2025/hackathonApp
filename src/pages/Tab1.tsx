import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Map from '../components/Map'; // Make sure the path is correct!

const Tab1: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Hello</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <Map />
    </IonContent>
  </IonPage>
);

export default Tab1;
