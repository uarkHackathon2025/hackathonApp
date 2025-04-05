import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Map from '../components/Map'; // 👈 Adjust path as needed
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* 👇 Show the Google Map here instead of ExploreContainer */}
        <Map />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;