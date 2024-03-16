import React, { useEffect, useState } from "react";
import "./Search.scss";

interface SearchProps {
  handleClose: () => void;
  isOpen: boolean;
}

const SearchComponent: React.FC<SearchProps> = ({ handleClose, isOpen }) => {
  const [searchValue, setSearchValue] = useState("");
  const popupHeight = 400;

  // use for the search property
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  //use for the close button
  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen, handleClose]);

  return (
    <div className="search-container" style={{ height: `${popupHeight}px` }}>
      <button className="search-close-btn" onClick={handleClose}>
        X
      </button> 
      <p className="search-label">Search</p>
      <div className="search-input-container">
        <img
          src="../images/mini_glass.jpeg"
          alt="Search"
        />
      <input
        type="text"
        placeholder="Search for restaurant cuisine, chef"
        value={searchValue}
        onChange={handleChange}
      />
      </div>
    </div>
  );
};

export default SearchComponent;