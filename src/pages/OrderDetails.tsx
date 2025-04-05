import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    const { photos, takePhoto } = usePhotoGallery();
    

    useEffect(() => {
        // 🔌 Replace with actual Firestore query based on `id`
        const dummyOrders: Order[] = [
            {
                id: 'order1',
                customer: 'Alice',
                items: ['Taco', 'Nachos', 'Soda'],
                address: '123 Main St, Dallas, TX',
            },
            {
                id: 'order2',
                customer: 'Bob',
                items: ['Burger', 'Fries'],
                address: '456 Elm St, Fort Worth, TX',
            },
        ];

        const found = dummyOrders.find((o) => o.id === id);
        setOrder(found || null);
    }, [id]);

    const handleConfirmDelivery = () => {
        if (order) {
            setOrder({ ...order, confirmed: true });
            takePhoto();
            // TODO: 🔥 Update Firebase order confirmation status here
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
