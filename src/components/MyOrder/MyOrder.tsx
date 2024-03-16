import { useOrder } from "../../contexts/OrderContext";
import "./MyOrder.scss";
import { isMobileScreen } from "../../utils/utils";

interface MyOrderProps {
  handleClose: () => void;
}

const MyOrder: React.FC<MyOrderProps> = ({ handleClose }) => {
  const { order } = useOrder();
  const isEmptyOrder = order.length === 0;

  // define the pop up height by the screen and if its empty or not 
  const popupHeight = isMobileScreen() ? (isEmptyOrder ? 218 : 514) : (isEmptyOrder ? 568 : 778);

  // get the restaurant name data
  const uniqueRestaurantNames = Array.from(new Set(order.map((item) => item.restaurantName)));

  // Calculate total price
  const totalPrice = order.reduce((total, item) => total + item.dishPrice * item.dishQuantity, 0);

  return (
    <div className="popup" style={{ height: `${popupHeight}px` }} onClick={(e) => e.stopPropagation()}> 
  
          {isEmptyOrder ? (
            <div className="empty-bag">
              <img style={{marginBottom:'24px'}} src={`${process.env.PUBLIC_URL}/images/Icons/emptyBag.svg`} alt="Empty Bag"/>

              {!isMobileScreen() && (
                <button className="Order-history-empty-bag-desk">ORDER HISTORY</button>
                )}
            </div>

          ) : (
            uniqueRestaurantNames.map((restaurantName, index) => (
              <div className="my-order-cards-container" key={index}>

                <div className="fixed-top">
                <p>{isMobileScreen() ? "MY ORDER" : "YOUR ORDER"}</p>
                <h2 >{restaurantName}</h2>
                </div>

                <ul>
                  {order
                    .filter((item) => item.restaurantName === restaurantName)
                    .map((item, index) => (
                      <li key={index} className="dish-card">
                          <img src={item.dishImage} alt={item.dishName}    />
                        <div>
                          <h2 className="order-dish-name">
                          {isMobileScreen() ? (
                             <span className="order-dish-quantity">{item.dishQuantity}x</span>
                          ) : (
                            <button className="desk-quantity-button">{item.dishQuantity}</button>
                          )}
                            {" "}{item.dishName}
                     </h2>
                          <p className="order-dish-changes">
                            {item.dishSide} | {item.dishChanges.join(", ")}
                          </p>
                        </div>
                        <div className="price-container">
                          <img src={`${process.env.PUBLIC_URL}/images/Icons/NIS.svg`} alt="nis"/>
                          <p className="order-dish-price">{item.dishPrice}</p>
                        </div>
                      </li>
                    ))}
                </ul>

                {isMobileScreen() ? (
                  <div className="fixed-bottom-mobile">
                    <div className="fixed-bottom-mobile-price">
                    <p style={{marginBottom:'20px'}}>TOTAL - </p>
                    <img src={`${process.env.PUBLIC_URL}/images/Icons/NIS.svg`} alt="nis"/>
                    <p>{totalPrice.toFixed(2)}</p>
                  </div>
                  <button className="checkout-btn">CHECKOUT</button>
                </div>
              ) : (

                <div className="fixed-bottom-desk">
                  <div className="add-a-comment-desk">
                  <hr style={{ width: "30%", marginBottom: "20px" ,  border: 'none', borderBottom: '1px solid #ccc'}} />
                    <p >Add A Comment</p>
                    <input
                    type="text"
                    placeholder="Special requests, allergies, dietary restrictions, etc."
                  />
                </div>

                <div className="fixed-bottom-desk-buttons">
                  <button className="checkout-btn">CHECKOUT &nbsp;&nbsp;
                  <img src={`${process.env.PUBLIC_URL}/images/Icons/NISwhite.svg`} alt="nis"/>
                  {totalPrice} 
                  </button>
                
                <button className="Order-history">ORDER HISTORY</button>
                </div>
                </div>
              )}
              

              </div>
            ))
          )}
      <div className="overlay" onClick={handleClose}></div>
    </div>
  );
};

export default MyOrder;
