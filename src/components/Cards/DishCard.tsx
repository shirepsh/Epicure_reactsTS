import React, { useEffect, useState } from "react";
import { isMobileScreen } from "../../utils/utils";
import "./DishCard.scss";
import { Restaurant } from "../../interfaces/Restaurant";
import DishPage from "../SingleDishPage/DishPage";

interface DishCardProps {
  dish: {
    id: number;
    name: string;
    ingredients: string;
    image: string;
    price: number;
    sides?: string[];
    changes?: string[];
    icon: string[];
  };
  restaurantId: number;
  restaurantsData: { restaurants: Restaurant[] };
  handleToggleDishPopup?: (dishId: number, restaurantId: number) => void; 
  showIcons?: boolean;
  selectedMeal: "breakfast" | "lunch" | "dinner"; 
}

const DishCard: React.FC<DishCardProps> = (props) => {
  const [iconsArray, setIconsArray] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner">("breakfast");

  const handleClosePopup = () => {
    setShowPopup(false); 
  };
  
  useEffect(() => {
    function convertIcons() {
      const icons = props.dish.icon.map(
        (icon) => `../../images/Icons/${icon}.svg`
      );
      setIconsArray(icons);
    }

    convertIcons();
  }, [props.dish.icon]);

  const handleToggleDishPopup = (dishId: number) => {
    setSelectedDishId(dishId);
    setSelectedMeal(props.selectedMeal); // Set the selected meal type
    setShowPopup(!showPopup);
  };
  
  return (
    <div className="card-dish-div">
      <img className="dish-img" src={props.dish.image} alt={props.dish.name} />

      <p className="card-dish-name" onClick={() => handleToggleDishPopup(props.dish.id)}>
        {props.dish.name}
      </p>

    {/* disply the icons only at the home page carousel -- which define bt showIcons true */}
    {/* if its desktop -- its should be implement before the ingredients */}
      {props.showIcons && !isMobileScreen() && (
        <div className="icon-div">
          {iconsArray.map((icon, index) => (
            <img key={index} src={icon} alt={`Icon ${index}`} />
          ))}
        </div>
      )}

      <div className="card-dish-ing"><a>{props.dish.ingredients}</a></div>

    {/* disply the icons only at the home page carousel -- which define bt showIcons true */}
    {/* if its mobile -- its should be implement after the ingredients */}
      {props.showIcons && isMobileScreen()  && (
        <div className="icon-div">
          {iconsArray.map((icon, index) => (
            <img key={index} src={icon} alt={`Icon ${index}`} />
          ))}
        </div>
      )}

    {/* diffrents price line between desktop to mobile */}
        {!isMobileScreen() ? (
          <div className="line-with-value">
            <div className="line"></div>
            <img src="../../images/Icons/NIS.svg" alt="" />
            <div className="card-dish-price">{props.dish.price}</div>
            <div className="line"></div>
          </div>
        ) : (
          <div className="price-h">
            <img src="../../images/Icons/NIS.svg" alt="" />
            <div className="card-dish-price">{props.dish.price}</div>
            <div className="line"></div>
          </div>
        )}


    {/* open a popup for the dishpage  */}
    {showPopup &&  (
      <DishPage
      // handleClose={() => setShowPopup(false)} 
      handleClose={handleClosePopup} 
      isOpen={showPopup}
      restaurantId={props.restaurantId}
      selectedMeal={selectedMeal}
      dishId={props.dish.id}
      restaurantsData={props.restaurantsData}
      />
)}


    </div>
  );
};

export default DishCard;


