// import React from "react";
// import "./FiltersDesk.scss";

// interface FiltersDeskProps {
// }

// const iconPath = "../../../images/Icons/filters_desk_arrow.svg";

// const FiltersDesk: React.FC<FiltersDeskProps> = (props) => {
//   return (
//     <div className="filters-desk">
//           <ul>
//             <li>Price Range <img src={iconPath} alt="" /></li>
//             <li>Distance <img src={iconPath} alt="" /></li>
//             <li>Rating <img src={iconPath} alt="" /></li>
//           </ul>
//       </div>
//   );
// };

// export default FiltersDesk;


import React, { useState } from "react";
import "./FiltersDesk.scss";
import PriceRangePopup from "./PriceRangePopup"; 
import DistancePopup from "./DistancePopup"; 
import RatingPopup from "./RatingPopup"; 

interface FiltersDeskProps {}

const iconPath = "../../../images/Icons/filters_desk_arrow.svg";

const FiltersDesk: React.FC<FiltersDeskProps> = (props) => {
  const [isPriceRangePopupOpen, setIsPriceRangePopupOpen] = useState(false);
  const [isDistancePopupOpen, setIsDistancePopupOpen] = useState(false);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);

  const togglePriceRangePopup = () => {
    setIsPriceRangePopupOpen(!isPriceRangePopupOpen);
    setIsDistancePopupOpen(false); // Close other popups when opening this one
    setIsRatingPopupOpen(false);
  };

  const toggleDistancePopup = () => {
    setIsDistancePopupOpen(!isDistancePopupOpen);
    setIsPriceRangePopupOpen(false); // Close other popups when opening this one
    setIsRatingPopupOpen(false);
  };

  const toggleRatingPopup = () => {
    setIsRatingPopupOpen(!isRatingPopupOpen);
    setIsPriceRangePopupOpen(false); // Close other popups when opening this one
    setIsDistancePopupOpen(false);
  };

  return (
    <div className="filters-desk">
      <ul>
        <li className={isPriceRangePopupOpen ? "active" : ""} onClick={togglePriceRangePopup}>Price Range <img src={iconPath} alt="" /></li>
        <li className={isDistancePopupOpen ? "active" : ""} onClick={toggleDistancePopup}>Distance <img src={iconPath} alt="" /></li>
        <li className={isRatingPopupOpen ? "active" : ""} onClick={toggleRatingPopup}>Rating <img src={iconPath} alt="" /></li>
      </ul>
      {isPriceRangePopupOpen && <PriceRangePopup />} 
      {isDistancePopupOpen && <DistancePopup />} 
      {isRatingPopupOpen && <RatingPopup />} 
    </div>
  );
};

export default FiltersDesk;

