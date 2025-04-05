// src/pages/CartPage.tsx
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonBackButton,
  IonButtons,
  IonIcon
} from '@ionic/react';
import { useCart } from '../components/CartContent';
import { FoodItem } from './RestaurantMenu';
import { trashOutline } from "ionicons/icons";


const CartPage: React.FC = () => {
  const { cart, totalPrice, removeFromCart } = useCart();

  const handleSubmitOrder = () => {
    console.log('Submitting order:', cart);
    // Later: send to backend
  };


  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton text="Back" />
            </IonButtons>
          <IonTitle slot="end">Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cart.length === 0 ? (
          <IonLabel>No items in cart.</IonLabel>
        ) : (
          <>
            <IonList>
              {cart.map((item, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{item.name}</h2>
                    <p>${item.price.toFixed(2)}</p>
                  </IonLabel>
                  <IonButton
                        fill="clear"
                        color="danger"
                        slot="end"
                        onClick={() => removeFromCart(item, index)}
                    >
                        <IonIcon icon={trashOutline} />
                    </IonButton>
                </IonItem>
              ))}
            </IonList>

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
              <IonButton expand="block" color="success" onClick={handleSubmitOrder}>
                Submit Order
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>

  );
};

export default CartPage;
