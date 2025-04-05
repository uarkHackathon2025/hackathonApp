import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { app, db } from './firebase';
import { doc, setDoc, addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore';

import './Driver.css';

interface Order {
  id: string;
  customer: string;
  items: string[];
  accepted?: boolean;
}

const Driver: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch orders from Firebase on component mount
    const tastQuery = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(tastQuery, (querySnapshot) => {
      const ordersFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersFirestore);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      // Update Firestore document: set accepted to true
      const orderRef = doc(db, 'orders', id);
      await setDoc(orderRef, { accepted: true }, { merge: true });

      // Update local state to reflect accepted status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, accepted: true } : order
        )
      );

      // Navigate to detailed order view
      history.push(`/order/${id}`);
    } catch (error) {
      console.error("Failed to accept order:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Driver</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {orders.map((order) => (
          <IonCard key={order.id} className="order-card ion-margin-bottom">
            <IonCardContent>
              <IonListHeader>
                <IonLabel>
                  <strong>Order for {order.customer}</strong>
                </IonLabel>
              </IonListHeader>

              <IonList>
                {order.items.map((item, index) => (
                  <IonItem key={index}>
                    <IonLabel>{item}</IonLabel>
                  </IonItem>
                ))}
              </IonList>

              <div className="ion-text-end ion-padding-top">
                {!order.accepted ? (
                  <IonButton onClick={() => handleAccept(order.id)} color="success">
                    Accept Order
                  </IonButton>
                ) : (
                  <IonLabel color="medium"><em>Accepted</em></IonLabel>
                )}
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Driver;
