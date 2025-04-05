import React from 'react';
import { useParams } from 'react-router-dom';
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
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';
import { restaurants } from './Tab2';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find(r => r.id === parseInt(id));

  if (!restaurant) {
    return <IonText color="danger">Restaurant not found</IonText>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
           <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle>{'Back'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Display restaurant icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={restaurant.icon} 
            alt={restaurant.name} 
            style={{ width: '48px', height: '48px', borderRadius: '40%', objectFit: 'cover' }} 
          />
          <span>{restaurant.name}</span>
        </div>


        {/* Restaurant description */}
        <IonItem>
          <IonLabel>

            <p>{restaurant.description}</p>
          </IonLabel>
        </IonItem>

        {/* Food Items */}
        <IonText>
          <h3>Food Items</h3>
          <IonList>
            {restaurant.foodItems.map((item, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{item.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                  <p>{item.price}</p>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default ItemDetailPage;

