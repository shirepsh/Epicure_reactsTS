// import React, { useEffect, useState } from 'react';
// import './Navbar.scss';
// import SideMenu from '../SideMenuWindow/SideMenu';
// import { Link } from 'react-router-dom';
// import MyOrder from '../MyOrder/MyOrder';
// import SearchComponent from '../SearchWindow/Search';
// import { isMobileScreen } from "../../utils/utils";
// import { useOrder } from '../../contexts/OrderContext';

// const Navbar: React.FC = () => {
//   const [showSideMenu, setShowSideMenu] = useState(false);
//   const [showMyOrder, setShowMyOrder] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [activeButton, setActiveButton] = useState('');
//   const { order } = useOrder();
   
//   const handleToggleSideMenu = () => {
//     setShowSideMenu(!showSideMenu);
//   };

//   const handleCloseSideMenu = () => {
//     setShowSideMenu(false);
//   };

//   const handleToggleMyOrder = () => {
//     setShowMyOrder(!showMyOrder);
//   };

//   const handleToggleSearchBox = () => {
//     setShowSearch(!showSearch);
//   };

//   const handleButtonClick = (buttonName: string) => {
//     setActiveButton(buttonName);
//   };

//   return (
//     <nav>
//         {/* left items */}
//           {isMobileScreen() ? (
//             <div className='left-items-mobile'>
//             <img onClick={handleToggleSideMenu} src={`${process.env.PUBLIC_URL}/images/Navbar/Menu.svg`} alt="Hamburger" />
//             </div>
//           ) : (

//             <div className='left-items-desk'>

//             <Link to="/home">
//             <img className='aboutImgDesk' src={`${process.env.PUBLIC_URL}/images/Navbar/About.svg`} alt="About"/>
//             <button
//               className={`epc-desk-btn ${activeButton === 'epicure' ? 'active' : ''}`}
//               onClick={() => handleButtonClick('epicure')}>EPICURE</button>
//             </Link>
          
//             <Link to="/our-restaurants">
//             <button
//               className={`desk-btn ${activeButton === 'restaurants' ? 'active' : ''}`}
//               onClick={() => handleButtonClick('restaurants')}> Restaurants</button>
//             </Link>

//           <Link to="/our-chefs">
//           <button
//             className={`desk-btn ${activeButton === 'chefs' ? 'active' : ''}`}
//             onClick={() => handleButtonClick('chefs')}>Chefs</button>
//           </Link>
//         </div>
//           )}

//             {/* center item for mobile */}
//           {isMobileScreen() && (
//               <div className="center-item">
//               <Link to="/home">
//                 <img src={`${process.env.PUBLIC_URL}/images/Navbar/About.svg`} alt="About" />
//               </Link>
//               </div>
//           )}
  
//             {/* right items */}
//           <div className="right-items">
//             <img className="searchImgDesk" onClick={handleToggleSearchBox} src={`${process.env.PUBLIC_URL}/images/Navbar/Search.svg`} alt="Search" />

//             <img className="vectorImgDesk" src={`${process.env.PUBLIC_URL}/images/Navbar/Vector.svg`} alt="Vector" />

//             {order.length > 0 && (
//             <span className='items-amount'>
//                 <img className="itemAmountImgDesk" src={`${process.env.PUBLIC_URL}/images/Navbar/items-amount.svg`} alt="order-amount" />
//             <span className='order-length'>{order.length}</span>
//           </span>)}

//             <img className="bagImgDesk" onClick={handleToggleMyOrder} src={`${process.env.PUBLIC_URL}/images/Navbar/Bag.svg`} alt="Bag" />
//         </div>

//       {showSideMenu && <SideMenu handleClose={handleCloseSideMenu} isOpen={showSideMenu} />}
//       {showMyOrder && <MyOrder handleClose={handleToggleMyOrder} />}
//       {showSearch && <SearchComponent handleClose={handleToggleSearchBox} isOpen={showSearch} />}
//         </nav>
// )}
    
// export default Navbar;


import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import SideMenu from '../SideMenuWindow/SideMenu';
import { Link } from 'react-router-dom';
import MyOrder from '../MyOrder/MyOrder';
import SearchComponent from '../SearchWindow/Search';
import { isMobileScreen } from "../../utils/utils";
import { useOrder } from '../../contexts/OrderContext';

const Navbar: React.FC = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showMyOrder, setShowMyOrder] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const { order } = useOrder();
   
  const handleToggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  const handleCloseSideMenu = () => {
    setShowSideMenu(false);
  };

  const handleToggleMyOrder = () => {
    setShowMyOrder(!showMyOrder);
  };

  const handleToggleSearchBox = () => {
    setShowSearch(!showSearch);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <nav>
        {/* left items */}
          {isMobileScreen() ? (
            <div className='left-items-mobile'>
            <img onClick={handleToggleSideMenu} src={`${process.env.PUBLIC_URL}/images/Navbar/Menu.svg`} alt="Hamburger" />
            </div>
          ) : (

            <div className='left-items-desk'>
            <Link to="/home"><img className='aboutImgDesk' src={`${process.env.PUBLIC_URL}/images/Navbar/About.svg`} alt="About"/> </Link>
       
              <Link to="/home" 
              onClick={() => handleButtonClick('epicure')} 
              className={`epc-desk-btn ${activeButton === 'epicure' ? 'active' : ''}`}>EPICURE</Link>
          
            <Link to="/our-restaurants"
              className={`desk-btn ${activeButton === 'restaurants' ? 'active' : ''}`}
              onClick={() => handleButtonClick('restaurants')}> Restaurants
            </Link>

          <Link to="/our-chefs"
            className={`desk-btn ${activeButton === 'chefs' ? 'active' : ''}`}
            onClick={() => handleButtonClick('chefs')}>Chefs
          </Link>
        </div>
          )}

            {/* center item for mobile */}
          {isMobileScreen() && (
              <div className="center-item">
              <Link to="/home">
                <img src={`${process.env.PUBLIC_URL}/images/Navbar/About.svg`} alt="About" />
              </Link>
              </div>
          )}
  
            {/* right items */}
          <div className="right-items">
            <img className="searchImgDesk" onClick={handleToggleSearchBox} src={`${process.env.PUBLIC_URL}/images/Navbar/Search.svg`} alt="Search" />

            <img className="vectorImgDesk" src={`${process.env.PUBLIC_URL}/images/Navbar/Vector.svg`} alt="Vector" />

            {order.length > 0 && (
            <span className='items-amount'>
                <img className="itemAmountImgDesk" src={`${process.env.PUBLIC_URL}/images/Navbar/items-amount.svg`} alt="order-amount" />
            <span className='order-length'>{order.length}</span>
          </span>)}

            <img className="bagImgDesk" onClick={handleToggleMyOrder} src={`${process.env.PUBLIC_URL}/images/Navbar/Bag.svg`} alt="Bag" />
        </div>

      {showSideMenu && <SideMenu handleClose={handleCloseSideMenu} isOpen={showSideMenu} />}
      {showMyOrder && <MyOrder handleClose={handleToggleMyOrder} />}
      {showSearch && <SearchComponent handleClose={handleToggleSearchBox} isOpen={showSearch} />}
        </nav>
)}
    
export default Navbar;






