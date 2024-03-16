import React from "react";
// import "./DistancePopup.scss";

interface DistancePopupProps {}

const DistancePopup: React.FC<DistancePopupProps> = (props) => {
  return (
    <div className="distance-popup">
      <img src="../../../images/FiltersDesk/Distance.png" alt="" />
    </div>
  );
};

export default DistancePopup;
