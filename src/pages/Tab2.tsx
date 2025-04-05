import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent,
  IonList,
  IonFab,
  IonFabButton,
  IonFabList,  
  IonIcon, 
  IonItem,
  IonAvatar,
  IonLabel, } from '@ionic/react';

  import {
    cartSharp,
    searchCircleSharp
  } from 'ionicons/icons';
  
import ExploreContainer from '../components/ExploreContainer';
import React, { useState, useEffect } from 'react';
import './Tab2.css';

const HomePage: React.FC = () => {
  const [items, setItems] = useState<{ id: number; name: string; price: number }[]>([]);
  const [cart, setCart] = useState<{ id: number; name: string }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 20; i++) {
      newItems.push({
        id: items.length + i + 1,
        name: generateRandomName(),
        price: 1.0 // placeholder price variable until Gabe pushes
      });
    }
    setItems([...items, ...newItems]);
  };

  const generateRandomName = () => {
    const adjectives = ['Spicy', 'Savory', 'Crispy', 'Tangy', 'Sweet', 'Juicy', 'Grilled', 'Roasted','Zesty','Meaty','Big','Yummy','Fat','Succulent','Super'];
    const dishes = ['Taco', 'Burger', 'Noodle Bowl', 'Rice Plate', 'Wrap', 'Pizza', 'Sandwich', 'Curry','Fried Chicken','Fish and Chips','Adrian','Josh','Santosh','Felix','Matthew'];
  
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const dish = dishes[Math.floor(Math.random() * dishes.length)];
  
    return `${adjective} ${dish}`;
  };

  // add to shopping cart
  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart(prev => [...prev, item]);
    setTotalPrice(prev => prev + item.price);
    console.log(`${item.name} added to cart`);
  };

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar color="primary" placeholder="Search" onIonInput={e => setSearchTerm(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
        <IonTitle color="primary" >GeoBites</IonTitle>
      </IonHeader >
      <IonContent className="ion-padding">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
        <ExploreContainer name="Home page" />

      <IonList>

        {filteredItems.map((item, index) => (
          <IonItem
            key={item.id}
            button
            onClick={() => addToCart(item)}
          >
            <IonAvatar slot="start">
                <img src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
            </IonAvatar>
            <IonLabel>{item.name}</IonLabel>

          </IonItem>
        ))}

      </IonList>

      {/* Scroll */}
        <IonInfiniteScroll
        onIonInfinite={(event) => {
              generateItems();
              setTimeout(() => event.target.complete(), 500);
        }}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>

        {/* Shopping Cart Button */}
        
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <IonFabButton>
              <IonIcon icon={cartSharp}></IonIcon>
            </IonFabButton>

            {cart.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  zIndex: 9999,
                  boxShadow: '0 0 4px black'
                }}
              >
                {cart.length}
              </div>
            )}
          </div>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
