import React from 'react';
import { Restaurant } from '../../../interfaces/Restaurant';
import { HomePageDish } from '../../../interfaces/HomePageDish';
import { Chef } from '../../../interfaces/Chef';
import RestaurantCarousel from '../HomePageRestaurantsCarousel/HomePageRestaurantCarousel';
import DishComponent from '../HomePageDishesCarousel/HomePageDish';
import Icons from '../HomePageIcons/HomePageIcons';
import ChefComponent from '../HomePageChef/HomePageChef';
import HomepageSearchBox from '../HomePageSearchBox/HomePageSearchBox';
import HomePageFooter from '../HomePageFooter/HomepageFooter';
import { Link } from 'react-router-dom';
import './HomePage.scss'
import { isMobileScreen } from "../../../utils/utils";

interface Props {
  restaurantsData: {
    restaurants: Restaurant[];
    dishes: HomePageDish[];
    chefs: Chef[];
  };
}

const HomePage: React.FC<Props> = ({ restaurantsData }) => {
  const { restaurants, dishes, chefs } = restaurantsData;
  return (
    <div className='main'>

      <div className='searchBox'>
      <HomepageSearchBox/>
      </div>
      
      <div className='second-main' >
        <p className='homepageLabels'>POPULAR RESTAURANT IN EPICURE:</p>
        <RestaurantCarousel restaurantsData={restaurantsData} />

      <div className='all-res-btn'>
        <Link to='/our-restaurants'>
          <img src="../images/HomePage/ResBtn.jpg" alt="" />
        </Link>
      </div>

        <p className='homepageLabels'>SIGNATURE DISH OF:</p>
        {/* <DishComponent dishesData={{ dishes }} /> */}
        <DishComponent dishesData={{ dishes, restaurants }} />

        </div>  

      <div className='icons-div'>
        <Icons/>
      </div>

      <div className='chef-main'>
        <p className='homepageLabels'>CHEF OF THE WEEK:</p>
        <ChefComponent chefsData={chefs} /> 
        
      {isMobileScreen() && (
          <div className='all-res-btn'>
          <Link to='/our-restaurants'>
            <img src="../images/HomePage/ResBtn.jpg" alt="" />
          </Link>
        </div>
      )}
      </div>

      <HomePageFooter/>
    </div>
  );
};

export default HomePage;
