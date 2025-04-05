// src/pages/CartPage.tsx
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonBackButton, IonButtons, IonIcon, IonInput, IonText, IonAlert } from '@ionic/react';
import { useCart } from '../components/CartContent';
import { trashOutline } from "ionicons/icons";

import { db } from './firebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, totalPrice, removeFromCart } = useCart();
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const handleSubmitOrder = () => {
    if (!username.trim()) {
      setShowAlert(true);
      return;
    }

    const orderData = {
      accepted: false,
      confirmed: false,
      customer: username,
      id: "",
      items: cart.map(item => item.name),
    };

    addDoc(collection(db, 'orders'), orderData)
      .then((docRef) => {
        return setDoc(docRef, {
          ...orderData,
          id: docRef.id
        }).then(() => {
          console.log("Order successfully added with ID:", docRef.id);
          history.push('/tabs/tab1');
        });
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
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
        }}></div>
        <IonToolbar style={{ marginTop: '24px' }}>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle slot="end">Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Username</IonLabel>
          <IonInput
            value={username}
            placeholder="Enter username"
            onIonChange={(e) => setUsername(e.detail.value!)}
          />
        </IonItem>

        {cart.length === 0 ? (
          <IonText color="medium">
            <p>No items in cart.</p>
          </IonText>
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

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Missing Name"
          message="Please enter your name before submitting the order."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
