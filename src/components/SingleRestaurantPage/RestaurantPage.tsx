// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Restaurant } from '../../interfaces/Restaurant';
// import DishCard from '../Cards/DishCard';
// import "./RestaurantPage.scss";


// interface Props {
//   restaurantsData: { restaurants: Restaurant[] };
// }

// const RestaurantPage: React.FC<Props> = ({ restaurantsData }) => {
//   const { id } = useParams<{ id: string }>();
//   const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedDishId, setSelectedDishId] = useState<number>(0);

//   const handleToggleDishPopup = (dishId: number) => {
//     setSelectedDishId(dishId);
//     setShowPopup(!showPopup);
//   };

//   const restaurant: Restaurant | undefined = restaurantsData.restaurants.find(
//     (restaurant) => restaurant.id.toString() === id
//   );

//   if (!restaurant) {
//     return <div>Restaurant not found</div>;
//   }

//   const isOpenNow = () => {
//     const currentDay = new Date().getDay();
//     const currentTime = new Date().toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//     const todayOpeningHours = restaurant.openingHours[currentDay];
//     return (
//       todayOpeningHours &&
//       todayOpeningHours.open !== null &&
//       todayOpeningHours.close !== null &&
//       todayOpeningHours.open <= currentTime &&
//       todayOpeningHours.close >= currentTime
//     );
//   };

//   const handleMealChange = (meal: 'breakfast' | 'lunch' | 'dinner') => {
//     setSelectedMeal(meal);
//   };

//   return (
//     <div className="res-page-general">
//       <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//       <div className='res-page-data'>
//       <p className="res-page-res-name">{restaurant.name}</p>
//       <p className="res-page-chef-name">{restaurant.chef}</p>
//       {isOpenNow() ? (
//         <p className="res-page-clock">
//           <img src="../../images/clock.svg" alt="" /> Open Now
//         </p>
//       ) : (
//         <p className="res-page-clock">
//           <img src="../../images/clock.svg" alt="" /> Closed Now
//         </p>
//       )}
//       <div className="meals-buttons">
//         <button
//           onClick={() => handleMealChange('breakfast')}
//           className={selectedMeal === 'breakfast' ? 'active' : ''}
//         >
//           Breakfast
//         </button>
//         <button onClick={() => handleMealChange('lunch')} className={selectedMeal === 'lunch' ? 'active' : ''}>
//           Lanch
//         </button>
//         <button onClick={() => handleMealChange('dinner')} className={selectedMeal === 'dinner' ? 'active' : ''}>
//           Dinner
//         </button>
//       </div>

//       <div className="restaurant-dishes">
//         {restaurant.dishes[selectedMeal].map((dish) => (
//           <DishCard 
//             key={dish.id} 
//             dish={dish} 
//             restaurantId={restaurant.id} 
//             restaurantsData={restaurantsData}
//             showIcons={false}
//             handleToggleDishPopup={handleToggleDishPopup} />
//         ))}
//       </div>
//       </div>

//       <hr style={{ border: '1px solid rgba(0, 0, 0, 0.05)', marginBottom: '32px' }} />
//     </div>
//   );
// };

// export default RestaurantPage;




import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Restaurant } from '../../interfaces/Restaurant';
import DishCard from '../Cards/DishCard';
import "./RestaurantPage.scss";
import { isMobileScreen } from "../../utils/utils";

interface Props {
  restaurantsData: { restaurants: Restaurant[] };
}

const RestaurantPage: React.FC<Props> = ({ restaurantsData }) => {
  const { id } = useParams<{ id: string }>();
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState<number | null>(null);
  const [selectedDish, setSelectedDish] = useState<{ dishId: number, restaurantId: number } | null>(null);

  console.log(selectedMeal)

  const handleToggleDishPopup = (dishId: number, restaurantId: number) => {
    setSelectedDish({ dishId, restaurantId });
    setShowPopup(true);
  };
  

  const restaurant: Restaurant | undefined = restaurantsData.restaurants.find(
    (restaurant) => restaurant.id.toString() === id
  );

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const isOpenNow = () => {
    const currentDay = new Date().getDay();
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const todayOpeningHours = restaurant.openingHours[currentDay];
    return (
      todayOpeningHours &&
      todayOpeningHours.open !== null &&
      todayOpeningHours.close !== null &&
      todayOpeningHours.open <= currentTime &&
      todayOpeningHours.close >= currentTime
    );
  };

  const handleMealChange = (meal: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedMeal(meal);
  };

  return (
    <div className="res-page-general">
      {!isMobileScreen() && (
        <hr style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }} />
      )}
       
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
      <div className='res-page-data'>
      <p className="res-page-res-name">{restaurant.name}</p>
      <p className="res-page-chef-name">{restaurant.chef}</p>
      {isOpenNow() ? (
        <p className="res-page-clock">
          <img src="../../images/clock.svg" alt="" /> Open Now
        </p>
      ) : (
        <p className="res-page-clock">
          <img src="../../images/clock.svg" alt="" /> Closed Now
        </p>
      )}
      <div className="meals-buttons">
        <button
          onClick={() => handleMealChange('breakfast')}
          className={selectedMeal === 'breakfast' ? 'active' : ''}
        >
          Breakfast
        </button>
        <button onClick={() => handleMealChange('lunch')} className={selectedMeal === 'lunch' ? 'active' : ''}>
          Lanch
        </button>
        <button onClick={() => handleMealChange('dinner')} className={selectedMeal === 'dinner' ? 'active' : ''}>
          Dinner
        </button>
      </div>

      <div className="restaurant-dishes">
        {restaurant.dishes[selectedMeal].map((dish) => (
          <DishCard 
            key={dish.id}
            dish={dish}
            restaurantId={restaurant.id}
            restaurantsData={restaurantsData}
            showIcons={false}
            handleToggleDishPopup={handleToggleDishPopup} selectedMeal={selectedMeal} />
        ))}
      </div>
      </div>

      <hr style={{ border: '1px solid rgba(0, 0, 0, 0.05)', marginBottom: '32px' }} />
    </div>
  );
};

export default RestaurantPage;












