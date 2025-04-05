import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel,
    IonList,
    IonListHeader,
    IonItem
  } from '@ionic/react';
  import { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore';
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  import { db } from './firebase';
  import { usePhotoGallery } from '../hooks/usePhotoGallery';
  import Map from '../components/Map';
  import CameraGallery from '../components/CameraGallery';
  
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
    const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    const { takePhoto } = usePhotoGallery();
  
    useEffect(() => {
      const orderQuery = query(collection(db, 'orders'));
      const unsubscribe = onSnapshot(orderQuery, (querySnapshot) => {
        const orders = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Order[];
  
        const found = orders.find((o) => o.id === id);
        if (found) {
          setOrder(found);
          if (found.confirmed && found.location) {
            setOrderLocation(found.location);
          }
        }
      });
  
      return () => unsubscribe();
    }, [id]);
  
    const handleConfirmDelivery = async () => {
      if (!order) return;
  
      const photo = await takePhoto();
      if (!photo.webPath) {
        console.error("No photo path available");
        return;
      }
  
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
  
      const storage = getStorage();
      const fileName = `photo_${new Date().getTime()}.jpeg`;
      const storageRef = ref(storage, `photos/${fileName}`);
  
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        'state_changed',
        null,
        (error) => console.error('Upload failed', error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
  
              const updatedOrder = {
                ...order,
                confirmed: true,
                photoURL: downloadURL,
                location,
              };
  
              const orderDocRef = doc(db, 'orders', order.id);
              await setDoc(orderDocRef, updatedOrder);
  
              setOrder(updatedOrder);
              setOrderLocation(location);
  
              console.log('Photo uploaded:', downloadURL);
              console.log('Location:', location);
            },
            (error) => console.error('Geolocation error:', error)
          );
        }
      );
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
          }}></div>
          <IonToolbar style={{ marginTop: '24px' }}>
            <IonTitle>Order for {order.customer}</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <IonList>
            <IonListHeader>
              <IonLabel><strong>Items</strong></IonLabel>
            </IonListHeader>
            {order.items.map((item, idx) => (
              <IonItem key={idx}>
                <IonLabel>{item}</IonLabel>
              </IonItem>
            ))}
          </IonList>
  
          <IonList className="ion-margin-top">
            <IonListHeader>
              <IonLabel><strong>Delivery Address</strong></IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>{order.address}</IonLabel>
            </IonItem>
          </IonList>
  
          <div className="ion-text-center ion-margin-top">
            {!order.confirmed ? (
              <IonButton onClick={handleConfirmDelivery} color="success">
                Confirm Delivery
              </IonButton>
            ) : (
              <IonLabel color="medium"><em>Delivery Confirmed</em></IonLabel>
            )}
          </div>
  
          <Map orderLocation={orderLocation} />
  
          {/* Optional: show CameraGallery if desired */}
          {/* <CameraGallery /> */}
        </IonContent>
      </IonPage>
    );
  };
  
  export default OrderDetails;
  
