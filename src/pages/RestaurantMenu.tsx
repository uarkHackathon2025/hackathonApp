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
  IonIcon,
  IonButton,
} from '@ionic/react';
import { useCart } from '../components/CartContent';
import { restaurants } from './Tab2';
import { add } from 'ionicons/icons';  // Import the plus icon
export interface FoodItem{
    id: number;
    name: string;
    icon: string;
    price: string;
}

export interface Restaurant{
    id: number;
    name: string;
    icon: string;
    foodItems: FoodItem[];

}

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { addToCart } = useCart();

  const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <IonPage>
        <IonHeader>
        <div style={{
          height: '30px',
          width: '100%',
          backgroundColor: 'black',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
          //padding: '5px 5px'
        }}></div>
        <IonToolbar style={{ marginTop: '35px' }}>
            <IonButtons slot="start">
              <IonBackButton text="Back" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent>
        {/* Display restaurant icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={restaurant.icon} 
            alt={restaurant.name} 
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}  // Larger icon size
          />
          <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{restaurant.name}</span>  {/* Larger restaurant name */}
        </div>
        {/* Restaurant description */}
                <IonItem>
                  <IonLabel>
        
                    <p>{restaurant.description}</p>
                  </IonLabel>
                </IonItem>
        <IonList>
          {restaurant.foodItems.map((item: FoodItem, index: number) => (
            <IonItem
              key={index}
              button
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: parseFloat(item.price.replace('$', '')), // still a string
                })
              }
            >
              <IonAvatar slot="start">
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  style={{ width: '50px', height: '50px' }}  // Larger avatar icon
                />
              </IonAvatar>
              <IonLabel>
                <h2 style={{ fontSize: '18px' }}>{item.name}</h2>  {/* Larger item name */}
                <p style={{ fontSize: '18px' }}>{item.price}</p>  {/* Larger price */}
              </IonLabel>              
              {/* Add button with the plus icon */}
              <IonButton 
                color='success'
                slot="end"
                fill="solid"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering the item click
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price.replace('$', '')), // still a string
                  });
                }}
              >
                <IonIcon icon={add} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantMenu;
