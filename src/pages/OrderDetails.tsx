import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Map from '../components/Map'; // Assuming you have a Map component

interface Order {
  id: string;
  customer: string;
  items: string[];
  address: string;
  confirmed?: boolean;
  photoURL?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const { takePhoto } = usePhotoGallery();

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
      // Take a picture using the device's camera
      const photo = await takePhoto();

      if (!photo.webPath) {
        console.error("No photo path available");
        return;
      }

      // Upload the photo to Firebase Storage
      const storage = getStorage();
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      // Create a unique file name for the photo
      const fileName = `photo_${new Date().getTime()}.jpeg`;
      const storageRef = ref(storage, `photos/${fileName}`);

      // Upload the photo to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        null,
        (error) => console.error("Upload failed", error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Get user's geolocation
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };

              // Update Firestore with delivery confirmation, photo URL, and geolocation data
              const orderDocRef = doc(db, "orders", order.id);
              await setDoc(orderDocRef, {
                ...order,
                confirmed: true,
                photoURL: downloadURL,
                location: location, // Add the location
              });

              // Update local state
              setOrder({ ...order, confirmed: true, photoURL: downloadURL, location });

              console.log("Photo uploaded:", downloadURL);
              console.log("Location:", location);
            },
            (error) => {
              console.error("Geolocation error:", error);
            }
          );
        }
      );
    }
  };

  if (!order) {
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
