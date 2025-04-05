import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { useState, useEffect } from 'react';
import { refresh } from 'ionicons/icons';
import Map from '../components/Map';
import PendingScreen from '../components/PendingScreen';
import WaitingScreen from '../components/WaitingScreen';
import { db } from './firebase';
import { doc, getDoc, collection, query, where, limit, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

const Tab1: React.FC = () => {
  const [appState, setAppState] = useState<'normal' | 'pending' | 'waiting'>('normal');
  const [showImage, setShowImage] = useState(false);
  const [orderLocation, setOrderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const openImage = () => {
    setShowImage(true);
  };

  const closeImage = () => {
    setShowImage(false);
  };

  // Function to clear current order state
  const clearOrderState = () => {
    setOrderLocation(null);
    setPhotoURL(null);
    setOrderId(null);
    setCustomerName(null);
    setOrderItems([]);
  };

  // Function to fetch a new order
  const fetchNewOrder = async () => {
    setIsLoading(true);
    
    try {
      // If there's a current order, delete it from the database first
      if (orderId) {
        try {
          await deleteDoc(doc(db, "orders", orderId));
          console.log(`Previous order ${orderId} deleted successfully`);
        } catch (deleteError) {
          console.error("Error deleting previous order:", deleteError);
        }
      }
      
      // Clear current order data
      clearOrderState();
      
      // Query for unassigned orders with confirmed=true
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef, 
        where("confirmed", "==", true),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const orderDoc = querySnapshot.docs[0];
        const newOrderId = orderDoc.id;
        const orderData = orderDoc.data();
        
        console.log("New order fetched:", newOrderId, orderData);
        
        // Update state with new order data
        setOrderId(newOrderId);
        
        if (orderData.location) {
          setOrderLocation({
            latitude: orderData.location.latitude,
            longitude: orderData.location.longitude
          });
        }
        
        if (orderData.photoURL) {
          setPhotoURL(orderData.photoURL);
        }
        
        if (orderData.customer) {
          setCustomerName(orderData.customer);
        }
        
        if (orderData.items && Array.isArray(orderData.items)) {
          setOrderItems(orderData.items);
        }

        // Set the appropriate app state based on order status
        if (orderData.confirmed === true) {
          setAppState('normal');
        } else if (orderData.accepted === true && orderData.confirmed === false) {
          setAppState('pending');
        } else {
          setAppState('waiting');
        }
      } else {
        console.log("No new orders found");
        // Handle case when no orders are available - state is already cleared above
      }
    } catch (error) {
      console.error("Error fetching new order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial order fetch
  useEffect(() => {
    fetchNewOrder();
  }, []);

  // Function to update order status
  const updateOrderStatus = async (status: 'normal' | 'pending' | 'waiting') => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      const orderRef = doc(db, "orders", orderId);
      
      // Update the status in the database based on the button clicked
      if (status === 'normal') {
        // Order delivered - confirmation true
        await updateDoc(orderRef, {
          confirmed: true,
          accepted: true
        });
      } else if (status === 'pending') {
        // Order delivering - accepted true, confirmation false
        await updateDoc(orderRef, {
          confirmed: false,
          accepted: true
        });
      } else if (status === 'waiting') {
        // Order waiting - both false
        await updateDoc(orderRef, {
          confirmed: false,
          accepted: false
        });
      }
      
      // Update the app state
      setAppState(status);
      console.log(`Order ${orderId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch a specific order by ID
  const fetchOrderById = async (id: string) => {
    try {
      const orderDocRef = doc(db, "orders", id);
      const orderDoc = await getDoc(orderDocRef);
      
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        console.log("Order data fetched:", orderData);
        
        if (orderData.location) {
          setOrderLocation({
            latitude: orderData.location.latitude,
            longitude: orderData.location.longitude
          });
        }
        
        if (orderData.photoURL) {
          setPhotoURL(orderData.photoURL);
        }
        
        if (orderData.customer) {
          setCustomerName(orderData.customer);
        }
        
        if (orderData.items && Array.isArray(orderData.items)) {
          setOrderItems(orderData.items);
        }
        
        // Set the appropriate app state based on order status
        if (orderData.confirmed === true) {
          setAppState('normal');
        } else if (orderData.accepted === true && orderData.confirmed === false) {
          setAppState('pending');
        } else {
          setAppState('waiting');
        }
      } else {
        console.error("Order document does not exist");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
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
          <IonTitle>
            {orderId ? `Order #${orderId.substring(0, 8)}...` : 'No Active Order'}
          </IonTitle>

        
          <IonTitle>Order #{orderId}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Interface buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          {/* View Image Button */}
          <div>
            <IonButton 
              size="default" 
              color="success" 
              onClick={openImage}
              disabled={!photoURL}
            >
              View Order Photo
            </IonButton>
          </div>
          
          {/* Control buttons */}
          <div>
            <IonButton 
              size="default" 
              color="danger" 
              onClick={fetchNewOrder}
              disabled={isLoading}
            >
              <IonIcon icon={refresh} slot="start" />
              Refresh
            </IonButton>
            <IonButton 
              size="small" 
              onClick={() => updateOrderStatus('normal')}
              disabled={!orderId || isLoading}
            >
              Delivered
            </IonButton>
            <IonButton 
              size="small" 
              color="warning" 
              onClick={() => updateOrderStatus('pending')}
              disabled={!orderId || isLoading}
            >
              Delivering
            </IonButton>
            <IonButton 
              size="small" 
              color="success" 
              onClick={() => updateOrderStatus('waiting')}
              disabled={!orderId || isLoading}
            >
              Waiting
            </IonButton>
          </div>
        </div>
        
        {/* Order information */}
        {orderId && (
          <div style={{
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            <h2 style={{ margin: '0 0 5px 0' }}>Customer: {customerName || 'Unknown'}</h2>
            <div>
              <strong>Items:</strong>
              <ul style={{ margin: '5px 0' }}>
                {orderItems.length > 0 ? (
                  orderItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No items found</li>
                )}
              </ul>
            </div>
            <div style={{
              marginTop: '5px',
              padding: '5px',
              backgroundColor: 
                appState === 'normal' ? '#d4edff' : 
                appState === 'pending' ? '#fff3cd' : '#d4f4e6',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              <strong>Status:</strong> {
                appState === 'normal' ? 'Delivered' :
                appState === 'pending' ? 'Delivering' : 'Waiting'
              }
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            <p>Loading new order...</p>
          </div>
        )}
        
        {/* Main content area */}
        <div style={{ 
          width: '100%', 
          height: orderId ? 'calc(100% - 150px)' : 'calc(100% - 60px)', 
          position: 'relative'
        }}>
          {/* Map component */}
          {(appState === 'normal' || appState === 'pending') && orderLocation && (
            <div style={{ 
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}>
              <Map orderLocation={orderLocation} />
            </div>
          )}
          
          {/* Overlay screens */}
          {appState === 'pending' && <PendingScreen />}
          {appState === 'waiting' && <WaitingScreen />}

          {/* No order message */}
          {!orderId && !isLoading && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <h2>No Active Order</h2>
              <p>Click the Refresh button to get a new order</p>
              <IonButton 
                color="primary" 
                onClick={fetchNewOrder}
                style={{ marginTop: '20px' }}
              >
                <IonIcon icon={refresh} slot="start" />
                Get New Order
              </IonButton>
            </div>
          )}
        </div>

        {/* Image Popup */}
        {showImage && photoURL && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }} onClick={closeImage}>
            <img
              src={photoURL}
              alt="Order Photo"
              style={{
                maxWidth: '90%',
                maxHeight: '80%',
                objectFit: 'contain',
                borderRadius: '10px',
              }}
            />
            <div style={{ 
              color: 'white', 
              marginTop: '1rem', 
              fontSize: '0.8rem',
              textAlign: 'center',
              maxWidth: '90%'
            }}>
              Order location: {orderLocation?.latitude.toFixed(6)}, {orderLocation?.longitude.toFixed(6)}
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;