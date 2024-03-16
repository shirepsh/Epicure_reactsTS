import React from 'react';
import RestaurantCard from '../../Cards/RestaurantCard';
import { isMobileScreen } from '../../../utils/utils';
import './HomePageRestaurantCarousel.scss';
import { Restaurant } from "../../../interfaces/Restaurant";

interface Props {
  restaurantsData: {
    restaurants: Restaurant[];
  };
}

const HomePageRestaurantCarousel: React.FC<Props> = ({ restaurantsData }) => {
  const { restaurants } = restaurantsData;

  // Determine whether it's a mobile screen
  const mobileScreen = isMobileScreen();

  // Render all restaurants on mobile, and only 3 on desktop
  return (
    <div className='headline-restaurant-hub-div'>
      <div className="restaurant-hub-div">
        <div className="custom-carousel-container">
          {restaurants.slice(0, mobileScreen ? restaurants.length : 3).map((restaurant: Restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              image={restaurant.image}
              name={restaurant.name}
              chef={restaurant.chef}
              rating={restaurant.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageRestaurantCarousel;

