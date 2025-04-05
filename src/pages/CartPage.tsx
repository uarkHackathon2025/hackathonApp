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

import { app, db } from './firebase'
import { doc, setDoc, addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore'

const CartPage: React.FC = () => {
  const { cart, totalPrice, removeFromCart } = useCart();

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        accepted: false,
        confirmed: false,
        customer: "Doug", // Replace with dynamic user name if needed
        id: "", // Will update this after adding
        items: cart.map(item => item.name),
        // createdAt: new Date()
      };
  
      // 1. Add the document
      const docRef = await addDoc(collection(db, 'orders'), orderData);
  
      // 2. Optionally update with the auto-generated ID
      await setDoc(docRef, {
        ...orderData,
        id: docRef.id
      });
  
      console.log("Order successfully added with ID:", docRef.id);
      // Optionally clear cart, show toast, navigate, etc.
  
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };


  return (

    <IonPage>
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
