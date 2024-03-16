import React, { useEffect, useState } from "react";
import { Restaurant } from "../../interfaces/Restaurant";
import "./DishPage.scss";
import { useOrder } from '../../contexts/OrderContext';
import { isMobileScreen } from "../../utils/utils";

interface Props {
  restaurantId: number;
  selectedMeal: "breakfast" | "lunch" | "dinner";
  dishId: number;
  restaurantsData: { restaurants: Restaurant[] };
  handleClose: () => void;
  isOpen: boolean;
}

const DishPage: React.FC<Props> = ({ restaurantId, selectedMeal, dishId, restaurantsData, handleClose,isOpen,}) => {

  const handleCloseButtonClick = () => {
    handleClose(); 
  };

// use for the close button
 useEffect(() => {
  if (!isOpen) {
    handleCloseButtonClick();
  }
}, [isOpen, handleCloseButtonClick]);

// useEffect to handle scrolling behavior
useEffect(() => {
  if (isOpen) {
    window.scrollTo(0, 0); 
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto"; 
  };
}, [isOpen]);


//neccesray consts
const { addToOrder, order, clearOrder } = useOrder();
const [quantity, setQuantity] = useState<number>(1);
const [selectedSide, setSelectedSide] = useState<string>("");
const [selectedChanges, setSelectedChanges] = useState<string[]>([]);

// Find the selected restaurant using the restaurantId prop
const selectedRestaurant = restaurantsData.restaurants.find(
  (restaurant) => restaurant.id === restaurantId
);

if (!selectedRestaurant) {
  return <div>Restaurant not found</div>;
}

// Find the selected dish based on the meal type and dish ID
const selectedDishes = selectedRestaurant.dishes[selectedMeal];
const selectedDish = selectedDishes
  ? selectedDishes.find((dish) => dish.id === dishId)
  : undefined;

if (!selectedDish) {
  return <div>Dish not found</div>;
}

// 2 diffrents restaurants logic
const addToBagHandler = () => {
  if (order.length > 0) {
    const existingOrderRestaurantId = order[0].restaurantId;
    if (parseInt(existingOrderRestaurantId) !== restaurantId) {
      const confirmation = window.confirm(`You can order only from one restaurant at a time. Do you want to change the order from ${order[0]?.restaurantName} to ${selectedRestaurant.name}?`);
      if (confirmation) {
        clearOrder();
        addToOrderHandler();
      }
      return;
    }
  }
  addToOrderHandler();
};

// add to bag function
  const addToOrderHandler = () => {
  const orderItem = {
    restaurantId: selectedRestaurant.id.toString(),
    restaurantName: selectedRestaurant.name,
    dishName: selectedDish.name,
    dishImage: selectedDish.image,
    dishQuantity: quantity,
    dishChanges: selectedChanges,
    dishSide: selectedSide,
    dishPrice: selectedDish.price * quantity,
  };

  addToOrder(orderItem);
};



  
return (
  <>
       {/* Dark overlay */}
       {isOpen && <div className="dark-overlay" />}
  <div className="dish-page-main">
    

     {!isMobileScreen() ? (
        <img className="close-btn" style={{width:'20px', height:'20px'}} onClick={handleCloseButtonClick} src={`${process.env.PUBLIC_URL}/images/Icons/closePage.svg`} alt="" />
      ) : (
        <img className="close-btn" onClick={handleCloseButtonClick} src={`${process.env.PUBLIC_URL}/images/Icons/closePage.svg`} alt="" />
      )}
    
        {isMobileScreen() && (
          <img className="dishPage-image" src={`${process.env.PUBLIC_URL}${selectedDish.image}`} alt={selectedDish.name}/>
        )}
      

      <div className="dish-page-first-container">

      {!isMobileScreen() && (
          <img className="dishPage-image" src={`${process.env.PUBLIC_URL}${selectedDish.image}`} alt={selectedDish.name}/>
        )}
        <p className="dish-page-dish-name">{selectedDish.name}</p>
        <p className="dish-page-dish-ingredients">{selectedDish.ingredients}</p>

        {!isMobileScreen() && (
          <div>
             <div className="dish-page-icons">
            {selectedDish.icon.map((icon: string, index: number) => (
              <img
                key={index}
                src={`../../images/Icons/${icon}.svg`}
                alt={icon}
              />
            ))}
          </div>
  
            <div className="line-with-value">
            <div className="line"></div>
            <img src="../../images/Icons/NIS.svg" alt="" />
            <div className="card-dish-price">{selectedDish.price}</div>
            <div className="line"></div>
          </div>
      </div>
        )}
        
      </div>

      <div className="dish-page-second-container">
        <div className="sides-container">

          {isMobileScreen() ? (
            <p  className="label-line">Choose a side</p>
          ) : 
          <p style={{marginTop:'80px', marginLeft:'30px'}} className="label-line">Choose a side</p>}
          
          <div className="dish-pages-all-sides">
            {selectedDish.sides.map((side, index) => (
              <div className="side-option" key={index}>
                <input
                  type="radio"
                  style={{ width: '18px', height: '18px' }}
                  id={`side${index}`}
                  name="side"
                  value={side}
                  onChange={() => setSelectedSide(side)}
                />
                <label htmlFor={`side${index}`}>{side}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="changes-container">
          {isMobileScreen() ? (
            <p className="label-line">Changes</p>
          ) : (
            <p style={{marginLeft:'50px'}} className="label-line">Changes</p>
          )}
          <div className="dish-page-all-changes">
            {selectedDish.changes.map((change, index) => (
              <div className="change-option" key={index}>
                <input
                  type="checkbox"
                  style={{ width: '18px', height: '18px' }}
                  id={`change${index}`}
                  name="change"
                  value={change}
                  onChange={(e) => {
                    const selectedChange = e.target.value;
                    if (selectedChanges.includes(selectedChange)) {
                      setSelectedChanges((prev) =>
                        prev.filter((change) => change !== selectedChange)
                      );
                    } else {
                      setSelectedChanges((prev) => [...prev, selectedChange]);
                    }
                  }}
                />
                <label htmlFor={`change${index}`}>
                  <span className="checkbox"></span>
                  {change}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="qu-container">
          {isMobileScreen() ? (
            <p className="label-line">Quantity</p> 
          ) : (
            <p style={{marginLeft:'20px'}} className="label-line">Quantity</p> 
          )}
          <div className="signs">
            <img
              className="menus-sign"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              src={`${process.env.PUBLIC_URL}/images/Icons/menus_sign.svg`} alt="" />
            <h1>{quantity}</h1>
            <img
              className="plus-sign"
              onClick={() => setQuantity((prev) => prev + 1)}
              src={`${process.env.PUBLIC_URL}/images/Icons/plus_sign.svg`} alt="" />
          </div>
        </div>
      </div>

      <button className="add-to-bag-btn" onClick={addToBagHandler}>
        ADD TO BAG
      </button> <br/><br/>

      {isMobileScreen() && (
         <hr style={{ border: "1px solid rgba(0, 0, 0, 0.05)", marginBottom: '28px' }} />
      )}
    
      <div className="Dish-page-footer">
        <ul>
        <li>Contact Us</li>
        <li>Term of Use</li>
        <li>Privacy Policy</li>
        </ul>
    </div>
    </div>
    </>
  );
};

export default DishPage;

