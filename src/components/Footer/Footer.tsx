import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
      <div className="footer-content">
        <ul className='ul-footer'>
          <li className='li-footer' >Contact Us</li>
          <li className='li-footer'>Terms of Use</li>
          <li className='li-footer'>Privacy Policy</li>
        </ul>
      </div>
  );
};

export default Footer;
