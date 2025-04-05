import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonAvatar,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  } from '@ionic/react';
  import { useParams } from 'react-router-dom';
  
  const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* Back button to go back to the list */}
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/tab2" />
            </IonButtons>
            <IonTitle>Item Detail</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{decodeURIComponent(id)}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonAvatar style={{ width: '100px', height: '100px', margin: '0 auto' }}>
                <img src={`https://picsum.photos/200?random=${id}`} alt="Random" />
              </IonAvatar>
              <IonLabel style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
                This is the detail page for <strong>{decodeURIComponent(id)}</strong>.  
                You can customize this page to show more item info, pricing, location, reviews, etc.
              </IonLabel>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ItemDetailPage;
  