import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { app, db } from './firebase'
import { doc, setDoc, addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import CameraGallery from '../components/CameraGallery';


interface Order {
    id: string;
    customer: string;
    items: string[];
    address: string;
    confirmed?: boolean; // New field for confirming delivery
}


const OrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [dummyOrders, setDummyOrders] = useState<Order[]>([]);
    const { photos, takePhoto } = usePhotoGallery();

    console.log(id);

    useEffect(() => {
        const tastQuery = query(collection(db, 'orders'));
        const unsubscribe = onSnapshot(tastQuery, (querySnapshot) => {
            const ordersFirestore = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            setDummyOrders(ordersFirestore);
    
            const found = ordersFirestore.find((o) => o.id === id);
            console.log(found);
            setOrder(found || null);
        });
    
        return () => unsubscribe();
    }, [id]);
    

    // const dummyOrders: Order[] = [
        //     {
        //         id: 'order1',
        //         customer: 'Alice',
        //         items: ['Taco', 'Nachos', 'Soda'],
        //         address: '123 Main St, Dallas, TX',
        //     },
        //     {
        //         id: 'order2',
        //         customer: 'Bob',
        //         items: ['Burger', 'Fries'],
        //         address: '456 Elm St, Fort Worth, TX',
        //     },
        // ];

        const handleConfirmDelivery = async () => {
            if (order) {
              const photo = await takePhoto(); // Get the photo object
              const storage = getStorage();
          
              if (!photo.webPath) {
                console.error("No photo path available");
                return;
              }
          
              // Fetch the photo as a blob
              const response = await fetch(photo.webPath);
              const blob = await response.blob();
          
              // Create a unique file name
              const fileName = `photo_${new Date().getTime()}.jpeg`;
              const storageRef = ref(storage, `photos/${fileName}`);
          
              // Upload photo to Firebase Storage
              const uploadTask = uploadBytesResumable(storageRef, blob);
          
              uploadTask.on(
                "state_changed",
                null,
                (error) => console.error("Upload failed", error),
                async () => {
                  // Get the download URL
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
                  // Get geolocation
                  navigator.geolocation.getCurrentPosition(
                    async (position) => {
                      const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      };
          
                      // Update Firestore with delivery confirmation, photo URL, and location
                      const orderRef = doc(db, "orders", order.id);
                      await setDoc(orderRef, {
                        ...order,
                        confirmed: true,
                        photoURL: downloadURL,
                        location: location,
                      });
          
                      console.log("Photo uploaded:", downloadURL);
                      console.log("Location:", location);
          
                      setOrder({ ...order, confirmed: true }); // Update local state
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
            </IonContent>
        </IonPage>
    );
};

export default OrderDetails;
