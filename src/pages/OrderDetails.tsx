import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { app, db } from './firebase'
import { doc, setDoc, addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore'
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
            // Take a photo and store it in a variable
            const newPhoto = await takePhoto();
    
            // Get the current geolocation
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
    
                    console.log("Photo taken:", newPhoto);
                    console.log("User location:", location);
    
                    // Update local state to reflect delivery confirmation
                    setOrder({ ...order, confirmed: true });
    
                    // TODO: 🔥 Save `newPhoto` and `location` to Firebase with delivery confirmation
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        }
    };
        

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
