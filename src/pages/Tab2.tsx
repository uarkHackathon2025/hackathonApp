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
  const [items, setItems] = useState<string[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 50; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
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

        {items.map((item, index) => (
          <IonItem key={item}>
            <IonAvatar slot="start">
              <img src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
            </IonAvatar>
            <IonLabel>{item}</IonLabel>
          </IonItem>
        ))}
      </IonList>

      /* Scroll*/
        <IonInfiniteScroll
        onIonInfinite={(event) => {
              generateItems();
              setTimeout(() => event.target.complete(), 500);
        }}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>

        /* Shopping Cart Button*/
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
