import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import Map from '../components/Map'; // Assuming you have a Map component

interface Order {
  id: string;
  customer: string;
  items: string[];
  address: string;
  confirmed?: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderDocRef = doc(db, "orders", id);
      const orderDoc = await getDoc(orderDocRef);
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        setOrder({ id: orderDoc.id, ...orderData } as Order);

        // If the order is confirmed and location exists, store the location
        if (orderData.confirmed && orderData.location) {
          setOrderLocation(orderData.location);
        }
      }
    };
    fetchOrderDetails();
  }, [id]);

  const handleConfirmDelivery = async () => {
    if (order) {
      // Here, we can simulate taking a photo, as in your original request

      // Simulating confirmed flag update
      const updatedOrder = { ...order, confirmed: true };

      // Update order data with confirmed flag and location in Firebase
      const orderDocRef = doc(db, "orders", order.id);
      await setDoc(orderDocRef, {
        ...updatedOrder,
        confirmed: true, // Mark the order as confirmed
      });

      setOrder(updatedOrder);
    }
  };

  // Replace with your real coordinates (latitude and longitude)
  const yourCoordinates = { latitude: 30.2672, longitude: -97.7431 }; // Example coordinates for Austin, TX
  
  // Set the coordinates on order confirmation if necessary
  useEffect(() => {
    if (order && order.confirmed) {
      setOrderLocation(yourCoordinates); // Update with your actual location
    }
  }, [order]);

  if (!order) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Order</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Loading order...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order for {order.customer}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLabel><strong>Items:</strong></IonLabel>
        {order.items.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
        <IonLabel><strong>Delivery Address:</strong></IonLabel>
        <p>{order.address}</p>

        <div className="ion-text-center ion-margin-top">
          {!order.confirmed ? (
            <IonButton onClick={handleConfirmDelivery} color="success">
              Confirm Delivery
            </IonButton>
          ) : (
            <IonLabel color="medium"><em>Delivery Confirmed</em></IonLabel>
          )}
        </div>

        {/* Map component, passing the order location */}
        <Map orderLocation={orderLocation} />
      </IonContent>
    </IonPage>
  );
};

export default OrderDetails;
