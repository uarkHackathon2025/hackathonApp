import React from 'react';
import { useParams } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Hardcoded data for restaurants and their food items
  const restaurants = [
    {
      id: 1,
      name: 'Taco Town',
      icon: 'https://example.com/taco-icon.png',
      description: 'Delicious tacos with a variety of fillings.',
      foodItems: [
        { id: 1, name: 'Spicy Taco', icon: 'https://example.com/spicy-taco.png', price: '$2.50' },
        { id: 2, name: 'Beef Taco', icon: 'https://example.com/beef-taco.png', price: '$3.00' },
        { id: 3, name: 'Chicken Taco', icon: 'https://example.com/chicken-taco.png', price: '$3.25' },
        { id: 4, name: 'Veggie Taco', icon: 'https://example.com/veggie-taco.png', price: '$2.75' },
        { id: 5, name: 'Fish Taco', icon: 'https://example.com/fish-taco.png', price: '$3.50' }
      ]
    },
    {
      id: 2,
      name: 'Burger Shack',
      icon: 'https://example.com/burger-icon.png',
      description: 'Juicy burgers with fresh ingredients.',
      foodItems: [
        { id: 1, name: 'Cheeseburger', icon: 'https://example.com/cheeseburger.png', price: '$5.00' },
        { id: 2, name: 'Bacon Burger', icon: 'https://example.com/bacon-burger.png', price: '$5.50' },
        { id: 3, name: 'Veggie Burger', icon: 'https://example.com/veggie-burger.png', price: '$4.75' },
        { id: 4, name: 'Chicken Burger', icon: 'https://example.com/chicken-burger.png', price: '$5.25' },
        { id: 5, name: 'BBQ Burger', icon: 'https://example.com/bbq-burger.png', price: '$5.75' }
      ]
    },
    {
      id: 3,
      name: 'Pizza Place',
      icon: 'https://example.com/pizza-icon.png',
      description: 'Freshly baked pizzas with a variety of toppings.',
      foodItems: [
        { id: 1, name: 'Pepperoni Pizza', icon: 'https://example.com/pepperoni-pizza.png', price: '$8.00' },
        { id: 2, name: 'Margherita Pizza', icon: 'https://example.com/margherita-pizza.png', price: '$7.50' },
        { id: 3, name: 'BBQ Chicken Pizza', icon: 'https://example.com/bbq-chicken-pizza.png', price: '$9.00' },
        { id: 4, name: 'Hawaiian Pizza', icon: 'https://example.com/hawaiian-pizza.png', price: '$8.50' },
        { id: 5, name: 'Veggie Pizza', icon: 'https://example.com/veggie-pizza.png', price: '$7.75' }
      ]
    },
    {
      id: 4,
      name: 'Noodle Nirvana',
      icon: 'https://example.com/noodle-icon.png',
      description: 'Delicious noodle dishes from around the world.',
      foodItems: [
        { id: 1, name: 'Spicy Noodles', icon: 'https://example.com/spicy-noodles.png', price: '$6.00' },
        { id: 2, name: 'Soba Noodles', icon: 'https://example.com/soba-noodles.png', price: '$5.75' },
        { id: 3, name: 'Ramen', icon: 'https://example.com/ramen.png', price: '$7.00' },
        { id: 4, name: 'Pad Thai', icon: 'https://example.com/pad-thai.png', price: '$7.50' },
        { id: 5, name: 'Pho', icon: 'https://example.com/pho.png', price: '$7.25' }
      ]
    },
    {
      id: 5,
      name: 'Sandwich Hub',
      icon: 'https://example.com/sandwich-icon.png',
      description: 'A variety of sandwiches for every taste.',
      foodItems: [
        { id: 1, name: 'Chicken Sandwich', icon: 'https://example.com/chicken-sandwich.png', price: '$4.50' },
        { id: 2, name: 'Grilled Cheese', icon: 'https://example.com/grilled-cheese.png', price: '$3.75' },
        { id: 3, name: 'BLT', icon: 'https://example.com/blt.png', price: '$4.25' },
        { id: 4, name: 'Veggie Sandwich', icon: 'https://example.com/veggie-sandwich.png', price: '$4.00' },
        { id: 5, name: 'Turkey Sandwich', icon: 'https://example.com/turkey-sandwich.png', price: '$4.75' }
      ]
    }
  ];

  // Find the restaurant by ID (Ensure id is cast to number)
  const restaurant = restaurants.find((restaurant) => restaurant.id === Number(id));

  if (!restaurant) {
    return <div>Restaurant not found</div>; // Handle case where restaurant doesn't exist
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{restaurant.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Display restaurant icon */}
        <div style={{ textAlign: 'center' }}>
          <img src={restaurant.icon} alt={restaurant.name} style={{ width: '80%', borderRadius: '8px' }} />
        </div>

        {/* Restaurant description */}
        <IonItem>
          <IonLabel>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
          </IonLabel>
        </IonItem>

        {/* Food Items */}
        <IonText>
          <h3>Food Items</h3>
          <IonList>
            {restaurant.foodItems.map((item, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{item.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                  <p>{item.price}</p>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default ItemDetailPage;

