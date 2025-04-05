import { useParams } from 'react-router-dom';
import { IonPage, IonContent, IonItem, IonAvatar, IonLabel, IonList } from '@ionic/react';
import { useCart } from '../components/CartContent';
import { restaurants } from './Tab2';

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
      <IonContent>
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
                <img src={item.icon} alt={item.name} />
              </IonAvatar>
              <IonLabel>
                <h2>{item.name}</h2>
                <p>{item.price}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantMenu;
