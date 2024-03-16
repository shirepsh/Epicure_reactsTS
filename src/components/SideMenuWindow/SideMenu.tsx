// SideMenu.tsx
import React, { useEffect } from 'react';
import './SideMenu.scss'; 
import { useNavigate } from 'react-router-dom';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
}

const SideMenu: React.FC<Props> = ({ handleClose , isOpen}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isOpen) {
            handleClose();
        }
        }, [isOpen, handleClose]);

    const handleMenuLinkClick = (path: string) => {
        navigate(path); 
        handleClose(); 
        };
    
    return (
        <div className={`side-menu-overlay ${isOpen ? 'open' : ''}`}>
            <div className="side-menu">
            <button className="close-btn" onClick={handleClose}>X</button>
            <div className="menu-item-div">
                <ul>
                {/* Use handleMenuLinkClick to navigate and close the menu */}
                <li onClick={() => handleMenuLinkClick('/our-restaurants')}>Restaurants</li>
                <li onClick={() => handleMenuLinkClick('/our-chefs')}>Chefs</li>
                </ul>
            </div>
            <div className="line"></div>
            <div className="menu-item-div">
                <ul>
                <li>Contact Us</li>
                <li>Term of Use</li>
                <li>Privacy Policy</li>
                </ul>
            </div>
            </div>
        </div>
        );
    };
        

export default SideMenu;
