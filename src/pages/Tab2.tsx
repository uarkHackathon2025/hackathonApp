import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem,IonAvatar, IonLabel, IonFab, IonFabButton, IonIcon} from '@ionic/react';
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
    description: 'Yummy tacos, yummy tacos.',
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
    description: 'Juicy burgers with fresh ingredients.',
    foodItems: [
      { id: 1, name: 'Cheeseburger', icon: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg', price: '$5.00' },
      { id: 2, name: 'Bacon Burger', icon: 'https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger__FocusFillWyIwLjAwIiwiMC4wMCIsMTEwMCw2NTdd.jpg', price: '$5.50' },
      { id: 3, name: 'Veggie Burger', icon: 'https://www.realsimple.com/thmb/SU9YyxI_5dFIurutkkGUe0iieLI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/real-simple-mushroom-black-bean-burgers-recipe-0c365277d4294e6db2daa3353d6ff605.jpg', price: '$4.75' },
      { id: 4, name: 'Chicken Burger', icon: 'https://www.brakebush.com/wp-content/uploads/Traditional-Chicken-Burger.jpg', price: '$5.25' },
      { id: 5, name: 'BBQ Burger', icon: 'https://mccormick.widen.net/content/3joemxhezm/original/applewood_bbq_burgers_2000x1125.jpg', price: '$5.75' }
    ]
  },
  {
    id: 3,
    name: 'Pizza Place',
    icon: 'https://ih1.redbubble.net/image.5119850856.5206/st,small,507x507-pad,600x600,f8f8f8.u7.jpg',
    description: 'Freshly baked pizzas with a variety of toppings.',
    foodItems: [
      { id: 1, name: 'Pepperoni Pizza', icon: 'https://i2.wp.com/lifemadesimplebakes.com/wp-content/uploads/2014/09/Classic-Pepperoni-Pizza-1.jpg', price: '$8.00' },
      { id: 2, name: 'Margherita Pizza', icon: 'https://www.abeautifulplate.com/wp-content/uploads/2015/08/the-best-homemade-margherita-pizza-1-4.jpg', price: '$7.50' },
      { id: 3, name: 'BBQ Chicken Pizza', icon: 'https://breadboozebacon.com/wp-content/uploads/2023/05/BBQ-Chicken-Pizza-IC-6.jpg', price: '$9.00' },
      { id: 4, name: 'Hawaiian Pizza', icon: 'https://dinnerthendessert.com/wp-content/uploads/2024/07/Hawaiian-Pizza-1-3-1.jpg', price: '$8.50' },
      { id: 5, name: 'Veggie Pizza', icon: 'https://i0.wp.com/kristineskitchenblog.com/wp-content/uploads/2024/12/veggie-pizza-recipe-09.jpg?resize=1365%2C2048&ssl=1', price: '$7.75' }
    ]
  },
  {
    id: 4,
    name: 'Noodle Nirvana',
    icon: 'https://www.kitchensanctuary.com/wp-content/uploads/2024/03/Stir-Fried-Noodles-with-Beansprouts-tall-FS.jpg',
    description: 'Delicious noodle dishes from around the world.',
    foodItems: [
      { id: 1, name: 'Spicy Noodles', icon: 'https://joanne-eatswellwithothers.com/wp-content/uploads/2015/09/pad-kee-mao.jpg', price: '$6.00' },
      { id: 2, name: 'Soba Noodles', icon: 'https://www.acouplecooks.com/wp-content/uploads/2020/03/Soba-Noodles-016.jpg', price: '$5.75' },
      { id: 3, name: 'Ramen', icon: 'https://thewoodenskillet.com/wp-content/uploads/2024/02/chicken-ramen-recipe-1.jpg', price: '$7.00' },
      { id: 4, name: 'Pad Thai', icon: 'https://mikhaeats.com/wp-content/uploads/2024/08/shrimp-pad-thai-blog-12.jpg', price: '$7.50' },
      { id: 5, name: 'Pho', icon: 'https://www.recipetineats.com/tachyon/2019/04/Beef-Pho_6.jpg?resize=900%2C1260&zoom=0.72', price: '$7.25' }
    ]
  },
  {
    id: 5,
    name: 'Sandwich Hub',
    icon: 'https://images.ctfassets.net/uexfe9h31g3m/4bBWJofhws8ewqIe0206cQ/fa6f419a9171a318b160dfec0f736cb2/New_York_Club_Sandwich_recipe_web.jpg?w=1024&h=768&fm=webp&fit=thumb&q=90',
    description: 'A variety of sandwiches for every taste.',
    foodItems: [
      { id: 1, name: 'Chicken Sandwich', icon: 'https://somethingaboutsandwiches.com/wp-content/uploads/2022/02/bacon-chicken-sandwich-987x1024.jpg', price: '$4.50' },
      { id: 2, name: 'Grilled Cheese', icon: 'https://flavor-feed.com/wp-content/uploads/2024/02/Untitled-design-2024-02-26T102112.850.jpg.webp', price: '$3.75' },
      { id: 3, name: 'BLT', icon: 'https://ohsweetbasil.com/wp-content/uploads/How-to-make-the-best-BLT-recipe-4-1365x2048.jpg', price: '$4.25' },
      { id: 4, name: 'Veggie Sandwich', icon: 'https://hips.hearstapps.com/hmg-prod/images/delish-20210423-ultimate-veggie-sandwich-001-ab-1622826517.jpg?resize=1200:*', price: '$4.00' },
      { id: 5, name: 'Turkey Sandwich', icon: 'https://assets-us-01.kc-usercontent.com/8cd01daa-f77b-0070-1a35-d5095e646e7a/e94b66cf-7b6b-4a5e-b06b-c0a1a21b0d7f/kid-pleaser-ham-turkey-sandwich.jpg?w=1280&auto=format', price: '$4.75' }
    ]
  }
];

const HomePage: React.FC = () => {
  const [items, setItems] = useState<{ id: number; name: string; price: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useCart();

  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <IonSearchbar
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value!)} // Update search term dynamically
            color="primary"
            debounce={300} // Optional: Add debounce for better performance
            placeholder="Search"
          />
        </IonToolbar>
        <IonTitle color="#f6f8fc">GeoBites</IonTitle>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {filteredRestaurants.map((restaurant) => (
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
          <IonFabButton onClick={() => history.push('/tabs/CartPage')}>
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
