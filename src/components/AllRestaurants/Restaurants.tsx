import React, { useState } from 'react';
import { Restaurant } from '../../interfaces/Restaurant';
import { isMobileScreen } from '../../utils/utils';
import RestaurantCard from '../Cards/RestaurantCard'; 
import './Restaurants.scss';
import FiltersDesk from '../FiltersDesk/FiltersDesk';

interface Props {
  restaurantsData: { restaurants: Restaurant[] };
}

const Restaurants: React.FC<Props> = ({ restaurantsData }) => {
  const [filter, setFilter] = useState<string>('all');
  const { restaurants } = restaurantsData;
  const [isMapView, setIsMapView] = useState<boolean>(false); 
  const [activeFilter, setActiveFilter] = useState<string>('all'); // State to track the active filter

// Filter restaurants based on the selected filter
const filteredRestaurants = () => {
  switch (filter) {
    case 'new':
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return restaurants.filter(restaurant => {
        const openingDate = new Date(restaurant.openingDay);
        return openingDate >= sixMonthsAgo;
      });
    case 'popular':
      return restaurants.filter(restaurant => restaurant.rating > 4); 
    case 'openNow':
      const currentDay = new Date().getDay();
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return restaurants.filter(restaurant => {
        const todayOpeningHours = restaurant.openingHours[currentDay];
        return todayOpeningHours && todayOpeningHours.open !== null && todayOpeningHours.close !== null &&
          todayOpeningHours.open <= currentTime && todayOpeningHours.close >= currentTime;
      });
    default:
      return restaurants;
  }
};

  // Render filtered restaurants using the generic RestaurantCard component
  const renderRestaurants = () => {
    const filtered = filteredRestaurants();

    return filtered.map((restaurant) => (
      <RestaurantCard
        id={restaurant.id}
        image={restaurant.image}
        name={restaurant.name}
        chef={restaurant.chef}
        rating={restaurant.rating}
      />
    ));
  };

  const handleFilterClick = (filter: string) => {
    setFilter(filter); // Update the filter state
    setActiveFilter(filter); // Update the activeFilter state for styling
    setIsMapView(false); // Deactivate map view when filter is clicked
  };
  

  const handleMapViewClick = () => {
    setIsMapView(!isMapView);
    setActiveFilter(''); ; // Deactivate all filter buttons when map view is clicked
  };

  return (
    <div>
         {!isMobileScreen() && (
        <hr style={{ width: '100%', marginBottom:'50px', border: 'none', borderBottom: '1px solid #F2F2F2' }} />
      )}

      <div className="restaurant-container">
        {isMobileScreen() && <p className="res-res-label">RESTAURANTS</p>}
        
        <div className="filter-buttons">
          <button onClick={() => handleFilterClick('all')} className={activeFilter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => handleFilterClick('new')} className={activeFilter === 'new' ? 'active' : ''}>New</button>
          <button onClick={() => handleFilterClick('popular')} className={activeFilter === 'popular' ? 'active' : ''}>Most Popular</button>
          <button onClick={() => handleFilterClick('openNow')} className={activeFilter === 'openNow' ? 'active' : ''}>Open Now</button>
        {!isMobileScreen() && (
          <button onClick={handleMapViewClick} className={`Map ${isMapView ? 'active' : ''}`}>Map View</button>
        )}
      </div>
        {/* add the second filter bar for desktop */}
        {!isMobileScreen() && <FiltersDesk></FiltersDesk>}
      </div>

        {!isMapView ? (
          <div>
          <div className="restaurant-grid">
            {renderRestaurants()}
          </div>
          <hr style={{ width: '100%', margin:'0px', marginBottom:'5px', border: 'none', borderBottom: '1px solid #F2F2F2' }} />
          </div>
        ) : (
          <div style={{height:'820px'}}>
            <img  className='res-map' src="../../../images/Restaurants/RestaurantMap.png" alt="Restaurant Map" />
            <hr style={{ width: '100%', border: 'none', borderBottom: '1px solid #F2F2F2' }} />
          </div>
        )}
    </div>
  );
};

export default Restaurants;
