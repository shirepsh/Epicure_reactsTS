import './HomePageFooter.scss';
import { isMobileScreen } from "../../../utils/utils";

const HomePageFooter: React.FC = () => {
  
  return (
        <div className="HP-footer-container" >

          <div className="HP-footer-Aboutimg" >
            <img src="../images/Footer/About-footer.svg" alt="" />
          </div>
         
         <div className='HP-footer-Frameimg-data'>

          {isMobileScreen() && (
            <img src="../images/Footer/Frame.svg" alt="" /> 
          )} 
          
          <div className='HP-footer-data'>
          <h2>ABOUT US:</h2> 
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum non <br/>
              eu ipsum. Cras porta malesuada eros, eget blandit <br/>
              turpis suscipit at.  Vestibulum sed massa in magna sodales porta.  Vivamus elit urna, <br/>
              dignissim a vestibulum. {!isMobileScreen() && ( <br/>)}  <br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum no <br/>
              eu ipsum. Cras porta  {isMobileScreen() && ( <br/>)}  malesuada eros.
          </p>
          </div>

          {!isMobileScreen() && (
            <img src="../images/Footer/FrameDesktop.svg" alt="" /> 
          )}
         </div>
        </div>
  );
};

export default HomePageFooter;
