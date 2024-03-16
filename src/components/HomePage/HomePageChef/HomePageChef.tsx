import React, { useState, useEffect } from "react";
import { Chef } from "../../../interfaces/Chef";
import "./HomePageChef.scss";
import { isMobileScreen } from "../../../utils/utils";

interface Props {
  chefsData: Chef[];
}

const HomePageChefComponent: React.FC<Props> = ({ chefsData }) => {
  const [currentChefIndex, setCurrentChefIndex] = useState<number>(0);
  const currentChef = chefsData[currentChefIndex];

  if (!currentChef) {
    return <div>No chefs available</div>;
  }

  return (
    <div className="HP-chef-main">
      <div key={currentChef.id}>
        <div className="chef-data">
          <div className="chef-image-data" >
            <div className="chef-name-box">
              <p>{currentChef.name}</p>
            </div>
          </div>
          <div className='chef-description'>{currentChef.description}</div>
        </div>

        {isMobileScreen() ? (
          <p className="chef-rests-label">{currentChef.private}'S RESTAURANTS</p>
        ) : (
          // charAt(0) keep the first letter as capital
          //slice choose from the second char (index1 - til the end) and lower case it
          <p className="chef-rests-label">{currentChef.private.charAt(0).toUpperCase()}{currentChef.private.slice(1).toLowerCase()}'s Restaurants</p>
        )}
      </div>
      
      {/* chef's restaurants */}
      <div className="headline-chef-hub-div">
        <div className="homepage-chef-hub-div ">
          <div className="custom-homepage-chef-container">
            {currentChef.restaurants.map((restaurant, index) => (
              <div key={index} className="custom-chef-res-item">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                />
                <p>{restaurant.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageChefComponent;
