import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { useState, useEffect } from 'react';
import { refresh, checkmarkCircle } from 'ionicons/icons';
import Map from '../components/Map';
import PendingScreen from '../components/PendingScreen';
import WaitingScreen from '../components/WaitingScreen';
import { db } from './firebase';
import { doc, getDoc, collection, query, where, onSnapshot, limit, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
// import { showHint } from '../components/HintButton';

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

  // Determine app state based on Firebase flags
  const determineAppState = (confirmed: boolean, accepted: boolean) => {
    if (confirmed === true && accepted === true) {
      return 'normal';
    } else if (accepted === true && confirmed === false) {
      return 'pending';
    } else {
      return 'waiting';
    }
  };

  // Function to fetch a new order
  const fetchNewOrder = async () => {
    setIsLoading(true);
    
    try {
      // Clear current order data
      clearOrderState();
      
      // Query for any order
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
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

        // Set the appropriate app state based on order status fields
        const confirmed = orderData.confirmed === true;
        const accepted = orderData.accepted === true;
        const newState = determineAppState(confirmed, accepted);
        setAppState(newState);
        console.log(`Setting app state to ${newState} based on confirmed=${confirmed}, accepted=${accepted}`);
      } else {
        console.log("No orders found");
        // Handle case when no orders are available - state is already cleared above
      }
    } catch (error) {
      console.error("Error fetching new order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle order received and delete it
  const handleOrderReceived = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      // Delete the order from the database
      await deleteDoc(doc(db, "orders", orderId));
      console.log(`Order ${orderId} deleted after being received`);
      
      // Clear current order data
      clearOrderState();
      
      // Set the app state to waiting
      setAppState('normal');
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial order fetch
  useEffect(() => {
    fetchNewOrder();
    
    // Set up listener for new confirmed orders
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("confirmed", "==", true));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          console.log("New confirmed order detected!");
          fetchNewOrder();
        }
      });
    }, (error) => {
      console.error("Error listening for new orders:", error);
    });
    
    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  // Set up real-time listener for changes to the current order
  useEffect(() => {
    if (!orderId) return;
    
    const orderRef = doc(db, "orders", orderId);
    
    const unsubscribe = onSnapshot(orderRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const orderData = docSnapshot.data();
          
        // Determine the app state based on the order status
        const confirmed = orderData.confirmed === true;
        const accepted = orderData.accepted === true;
        const newState = determineAppState(confirmed, accepted);
          
        // Update the app state if it's different
        if (newState !== appState) {
          setAppState(newState);
          console.log(`App state updated to ${newState} based on order data changes`);
        }
      }
    }, (error) => {
      console.error("Error watching order changes:", error);
    });
    
    return () => unsubscribe();
  }, [orderId, appState]);

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
          <IonTitle>
            {orderId ? `Order #${orderId.substring(0, 8)}...` : 'No Active Order'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Top button row - Only showing the View Image button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-start', // Changed from space-between since there's only one button now
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
          
          {/* Removed the duplicate "I got my Order!" button that was here */}
        </div>
        
        {/* Order information */}
        {orderId && (
          <div style={{
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
                appState === 'normal' ? '#28bb50' : 
                appState === 'pending' ? '#FFA500' : '#69b7f4',
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
              <p>Waiting for new orders...</p>
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
              <span>Delivery area</span>
            </div>
          </div>
        )}

        {/* Order received confirmation - only visible in normal state */}
        {appState === 'normal' && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px',
            zIndex: 100
          }}>
            <IonButton 
              expand="block"
              size="large"
              color="primary"
              onClick={handleOrderReceived}
              disabled={isLoading}
              style={{
                maxWidth: '500px',
                width: '100%'
              }}
            >
              <IonIcon icon={checkmarkCircle} slot="start" />
              I got my Order!
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;