import "./HomePageIcons.scss";
import { isMobileScreen } from "../../../utils/utils";

const HomePageIcons: React.FC = () => {
  
  const path = "../images/Icons/";
  return (
    <div className="icons-contanier">
      <div className="sentcence">THE MEANING OF OUR ICONS: </div>

      {isMobileScreen() && (
        <div className="icons-wrapper">
                <img src={`${path}spicy.svg`} alt="" />
                <p style={{marginBottom:'55px'}}>Spicy</p>
                <img src={`${path}vegitarian.svg`}alt="" />
                <p style={{marginBottom:'55px'}}>Vegitarian</p>
                <img src={`${path}vegan.svg`}  alt="" />
                <p>Vegan</p>
        </div>
      )}

      {!isMobileScreen() && (
        <div className="icons-wrapper">
          <div className="icons-images">
            <img src={`${path}spicy.svg`} alt="" />
            <img src={`${path}vegitarian.svg`} alt="" />
            <img src={`${path}vegan.svg`} alt="" />
          </div>

          <div className="icons-names">
            <p>Spicy</p>
            <p>Vegitarian</p>
            <p>Vegan</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageIcons;
