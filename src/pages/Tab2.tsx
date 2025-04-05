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
    cartSharp
  } from 'ionicons/icons';
  
import ExploreContainer from '../components/ExploreContainer';
import React, { useState, useEffect } from 'react';
import './Tab2.css';

const HomePage: React.FC = () => {
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 20; i++) {
      newItems.push({
        id: items.length + i + 1,
        name: generateRandomName()
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

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar color="primary" placeholder="Search"></IonSearchbar>
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

        <IonList>
          {items.map((item) => (
            <IonItem
              key={item.id}
              routerLink={`/tabs/item/${encodeURIComponent(item.name)}`}
              button
            >
              <IonAvatar slot="start">
                <img src={`https://picsum.photos/80/80?random=${item.id}`} alt="avatar" />
              </IonAvatar>
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

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
          <IonFabButton>
            <IonIcon icon={cartSharp}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
