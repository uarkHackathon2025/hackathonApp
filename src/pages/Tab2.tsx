import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar, 
  IonList, 
  IonItem,
  IonAvatar, 
  IonLabel, 
  IonFab, 
  IonFabButton, 
  IonIcon,
} from '@ionic/react';

import { cartSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './Tab2.css';
import React, { useEffect, useState } from 'react'; // Add useState here
import { useCart } from '../components/CartContent';
import { useHistory } from 'react-router-dom';




export const restaurants = [
  {
    id: 1,
    name: 'Taco Town',
    icon: 'https://i.imgur.com/bRv3En1.jpeg',
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
    icon: 'https://www.wikihow.com/images/a/a7/Draw-the-Krusty-Krab-Step-34.jpg',
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
    icon: 'https://ih1.redbubble.net/image.5119850856.5206/st,small,507x507-pad,600x600,f8f8f8.u7.jpg',
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
    name: 'Noodle ',
    icon: 'https://www.kitchensanctuary.com/wp-content/uploads/2024/03/Stir-Fried-Noodles-with-Beansprouts-tall-FS.jpg',
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
    icon: 'https://images.ctfassets.net/uexfe9h31g3m/4bBWJofhws8ewqIe0206cQ/fa6f419a9171a318b160dfec0f736cb2/New_York_Club_Sandwich_recipe_web.jpg?w=1024&h=768&fm=webp&fit=thumb&q=90',
    foodItems: [
      { id: 1, name: 'Chicken Sandwich', icon: 'https://example.com/chicken-sandwich.png', price: '$4.50' },
      { id: 2, name: 'Grilled Cheese', icon: 'https://example.com/grilled-cheese.png', price: '$3.75' },
      { id: 3, name: 'BLT', icon: 'https://example.com/blt.png', price: '$4.25' },
      { id: 4, name: 'Veggie Sandwich', icon: 'https://example.com/veggie-sandwich.png', price: '$4.00' },
      { id: 5, name: 'Turkey Sandwich', icon: 'https://example.com/turkey-sandwich.png', price: '$4.75' }
    ]
  }
];

const HomePage: React.FC = () => {
  const [items, setItems] = useState<{ id: number; name: string; price: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useCart();

  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Hardcoded data
  const restaurants = [
    {
      id: 1,
      name: 'Taco Town',
      icon: 'https://i.imgur.com/bRv3En1.jpeg',
      foodItems: [
        { id: 1, name: 'Spicy Taco', icon: 'https://monkeyandmekitchenadventures.com/wp-content/uploads/2019/06/Spicy-Moroccan-Tacos_19.jpg', price: '$2.50' },
        { id: 2, name: 'Beef Taco', icon: 'https://kaynutrition.com/wp-content/uploads/2023/08/shredded-beef-tacos.jpg', price: '$3.00' },
        { id: 3, name: 'Chicken Taco', icon: 'https://hips.hearstapps.com/hmg-prod/images/chicken-tacos-lead-659443cbe4a7a.jpg?crop=1xw:1xh;center,top&resize=1200:*', price: '$3.25' },
        { id: 4, name: 'Veggie Taco', icon: 'https://www.connoisseurusveg.com/wp-content/uploads/2025/02/veggie-tacos-7.jpg', price: '$2.75' },
        { id: 5, name: 'Fish Taco', icon: 'https://www.urbanbakes.com/wp-content/uploads/2019/05/Crunchy-Fish-Tacos-with-Avocado-Lime-Sauce-URBAN-BAKES-7.1.jpg', price: '$3.50' }
      ]
    },
    {
      id: 2,
      name: 'Burger Shack',
      icon: 'https://www.wikihow.com/images/a/a7/Draw-the-Krusty-Krab-Step-34.jpg',
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
      icon: 'https://ih1.redbubble.net/image.5119850856.5206/st,small,507x507-pad,600x600,f8f8f8.u7.jpg',
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
      name: 'Noodle ',
      icon: 'https://www.kitchensanctuary.com/wp-content/uploads/2024/03/Stir-Fried-Noodles-with-Beansprouts-tall-FS.jpg',
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
      icon: 'https://images.ctfassets.net/uexfe9h31g3m/4bBWJofhws8ewqIe0206cQ/fa6f419a9171a318b160dfec0f736cb2/New_York_Club_Sandwich_recipe_web.jpg?w=1024&h=768&fm=webp&fit=thumb&q=90',
      foodItems: [
        { id: 1, name: 'Chicken Sandwich', icon: 'https://example.com/chicken-sandwich.png', price: '$4.50' },
        { id: 2, name: 'Grilled Cheese', icon: 'https://example.com/grilled-cheese.png', price: '$3.75' },
        { id: 3, name: 'BLT', icon: 'https://example.com/blt.png', price: '$4.25' },
        { id: 4, name: 'Veggie Sandwich', icon: 'https://example.com/veggie-sandwich.png', price: '$4.00' },
        { id: 5, name: 'Turkey Sandwich', icon: 'https://example.com/turkey-sandwich.png', price: '$4.75' }
      ]
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar color="primary" placeholder="Search"></IonSearchbar>
        </IonToolbar>
        <IonTitle color="primary">GeoBites</IonTitle>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {restaurants.map((restaurant) => (
            <Link to={`/tabs/tab2/restaurant/${restaurant.id}`} key={restaurant.id}>
              <IonItem>
                <IonAvatar slot="start">
                  <img src={restaurant.icon} alt={restaurant.name} style={{ width: '40px', height: '40px' }} />
                </IonAvatar>
                <IonLabel>{restaurant.name}</IonLabel>
              </IonItem>
            </Link>
          ))}
        </IonList>

        {/* Shopping Cart Button */}
        
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
          <IonFabButton onClick={() => history.push('/cart')}>
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
