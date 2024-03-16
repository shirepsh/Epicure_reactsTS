import React, { useEffect, useState } from "react";
import { Restaurant } from "../../interfaces/Restaurant";
import "./DishPage.scss";
import { useOrder } from "../../contexts/OrderContext";
import { isMobileScreen } from "../../utils/utils";

interface Props {
  restaurantId: number;
  selectedMeal: "breakfast" | "lunch" | "dinner";
  dishId: number;
  restaurantsData: { restaurants: Restaurant[] };
  handleClose: () => void;
  isOpen: boolean;
}

const DishPageDesk: React.FC<Props> = ({
  restaurantId,
  selectedMeal,
  dishId,
  restaurantsData,
  handleClose,
  isOpen,
}) => {
  
  //use for the close button
  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen, handleClose]);

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

  const addToBagHandler = () => {
    if (order.length > 0) {
      const existingOrderRestaurantId = order[0]?.restaurantId.toString();
      if (existingOrderRestaurantId !== restaurantId.toString()) {
        // If the user tries to add a dish from a different restaurant, prompt for confirmation
        const confirmation = window.confirm(
          `You can order only from one restaurant at a time. Do you want to change the order from ${order[0]?.restaurantName} to ${selectedRestaurant.name}?`
        );
        if (confirmation) {
          clearOrder();
          addToOrderHandler();
        }
        return;
      }
    }

    addToOrderHandler();
  };

  const addToOrderHandler = () => {
    // Add the dish details to the order
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

  // Render the selected dish
  return (
    <div className="dish-page-main">
      {isOpen && <div className="dark-overlay" />}

      <div className="dish-popup-container">
      <button
        className="dish-popup-close-btn"
        onClick={() => handleClose()}>X</button>

        <img
          className="dishPage-image"
          src={`${process.env.PUBLIC_URL}${selectedDish.image}`}
          alt={selectedDish.name}
        />

        <div className="dish-page-first-container">
        <p className="dish-page-dish-name">{selectedDish.name}</p>
        <p className="dish-page-dish-ingredient">{selectedDish.ingredients}</p>

        {!isMobileScreen() && (
          <div className="dish-page-icons">
            {selectedDish.icon.map((icon: string, index: number) => (
              <img
                key={index}
                src={`../../images/Icons/${icon}.svg`}
                alt={icon}
                className="dish-page-dish-icon"
              />
            ))}
          </div>
        )}

        <div className="dish-page-price-container">
            <hr style={{ width: '90px' }}></hr>
            <img className="iconNIS"  src="../../images/Icons/NIS.svg"></img>
            <p className="dish-page-card-price">{selectedDish.price}</p>
            <hr style={{ width: '90px' }}></hr>
        </div>
        </div>

        <div className="dish-page-second-container">

          <div className="sides-container">
            <p className="label-line">Choose a side</p>
            <div className="dish-pages-all-sides">
              {selectedDish.sides.map((side, index) => (
                <div className="side-option" key={index}>
                  <input
                    type="radio"
                    id={`side${index}`}
                    name="side"
                    value={side}
                    onChange={() => setSelectedSide(side)}
                  />
                  <label htmlFor={`side${index}`}>{side}</label>
                </div>
              ))}
            </div>
          </div>{" "}
         
          <div className="changes-container">
            <p className="label-line">Changes:</p>
            <div className="dish-page-all-changes">
              {selectedDish.changes.map((change, index) => (
                <div className="change-option" key={index}>
                  <input
                    type="checkbox"
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
            <p className="label-line">Quantity:</p> <br/>
            <div className="signs">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <h1>{quantity}</h1>
              <button
                style={{ fontSize: "30px" }}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
       
        <button className="add-to-bag-btn" onClick={addToBagHandler}>
          ADD TO BAG
        </button>
       
      </div>
    </div>
  );
};

export default DishPageDesk;
