// import React, { useEffect, useState } from "react";
// import { HomePageDish } from "../../../interfaces/HomePageDish";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./HomePageDish.scss";
// import { isMobileScreen } from "../../../utils/utils";

// interface Props {
//   dishesData: {
//     dishes: HomePageDish[];
//   };
// }

// const HomePageDishComponent: React.FC<Props> = ({ dishesData }) => {

//   return (
//     <div className="headline-dish-hub-div">
//       <div className="dish-hub-div">
//         <div className="dish-carousel-container">
//           {dishesData.dishes.map((dish: HomePageDish) => (
//             <div key={dish.id} className="custom-dish-carousel-item">
//               <img
//                 src={dish.image}
//                 alt={dish.name}
//                 className="Carousel-dish-image"
//               />
//               <h2 className="Carousel-dish-name">{dish.name}</h2>
//               {!isMobileScreen() ? (
//                 <>
//                   <div className="dish-icon-container">
//                     {dish.icon.map((icon: string, index: number) => (
//                       <img
//                         key={index}
//                         src={`../images/Icons/${icon}.svg`}
//                         alt={icon}
//                         className="Carousel-dish-icon"
//                       />
//                     ))}
//                   </div>
//                   <div className="Carousel-dish-ingredients">{dish.ingredients}</div>
//                 </>
//               ) : (
//                 <>
//                   <div className="Carousel-dish-ingredients">{dish.ingredients}</div>
//                   <div className=""></div>
//                   <div className="dish-icon-container">
//                     {dish.icon.map((icon: string, index: number) => (
//                       <img
//                         key={index}
//                         src={`../images/Icons/${icon}.svg`}
//                         alt={icon}
//                         className="Carousel-dish-icon"
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}

//               {!isMobileScreen() && (
//                        <div className="Price-container">
//                        <hr className="desk-dish-price" style={{ width: '90px' }}></hr>
//                        <p className="Carousel-dish-price">₪{dish.price}</p>
//                        <hr className="desk-dish-price" style={{ width: '90px' }}></hr>
//                      </div>
//               )}

//               {isMobileScreen() && (
//                   <div className="Price-container">
//                   <p className="Carousel-dish-price">₪{dish.price}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePageDishComponent;

import React from "react";
import { HomePageDish } from "../../../interfaces/HomePageDish";
import DishCard from "../../Cards/DishCard";
import { Restaurant } from "../../../interfaces/Restaurant";
import "./HomePageDish.scss";
import { isMobileScreen } from "../../../utils/utils";

interface Props {
  dishesData: {
    dishes: HomePageDish[];
    restaurants: Restaurant[];
  };
}

const HomePageDishComponent: React.FC<Props> = ({ dishesData }) => {
  const { dishes, restaurants } = dishesData;

  const mobileScreen = isMobileScreen();

  return (
    <div className="headline-dish-hub-div">
      <div className="dish-hub-div">
        <div className="dish-carousel-container">
          {dishes.map((dish) => (
              <DishCard
              key={dish.id}
              dish={dish}
              restaurantsData={{ restaurants }}
              restaurantId={0}
              showIcons={true} selectedMeal={"breakfast"}              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageDishComponent;
