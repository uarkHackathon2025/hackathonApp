import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';

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
    // 🔌 Placeholder: Replace with Firebase connection

    const tastQuery = query(collection(db, 'orders'));
      const unsubscribe = onSnapshot(tastQuery, (querySnapshot) => {
          const ordersFirestore = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setOrders(ordersFirestore);
      });

    // setOrders([
    //   {
    //     id: 'order1',
    //     customer: 'Alice',
    //     items: ['Taco', 'Nachos', 'Soda'],
    //     accepted: false
    //   },
    //   {
    //     id: 'order2',
    //     customer: 'Bob',
    //     items: ['Burger', 'Fries'],
    //     accepted: false
    //   }
    // ]);
  }, []);

  const handleAccept = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, accepted: true } : order
      )
    );

    // TODO: 🔥 Update Firebase order status here

    // Navigate to detailed view
    history.push(`/order/${id}`);
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