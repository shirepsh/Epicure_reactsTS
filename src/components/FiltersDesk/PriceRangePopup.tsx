import React from "react";
// import "./PriceRangePopup.scss";

interface PriceRangePopupProps {}

const PriceRangePopup: React.FC<PriceRangePopupProps> = (props) => {
  return (
    <div className="PriceRangePopup">
      <img src="../../../images/FiltersDesk/Price_Range.png" alt="" />
    </div>
  );
};

export default PriceRangePopup;
