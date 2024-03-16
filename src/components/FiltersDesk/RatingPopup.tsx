import React from "react";
// import "./RatingPopup.scss";

interface RatingPopupProps {}

const RatingPopup: React.FC<RatingPopupProps> = (props) => {
  return (
    <div className="rating-popup">
      <img src="../../../images/FiltersDesk/Rating.png" alt="" />
    </div>
  );
};

export default RatingPopup;
