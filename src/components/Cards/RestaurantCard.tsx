import { Link } from 'react-router-dom';
import { isMobileScreen } from '../../utils/utils';
import './RestaurantCard.scss';

interface RestaurantCardProps {
  id: number;
  image: string;
  name: string;
  chef: string;
  rating: number;
}

export default function RestaurantCard(props: RestaurantCardProps) {
  const fullStars = new Array(props.rating).fill(null);
  const emptyStars = new Array(5 - props.rating).fill(null);

  return (
    <div className='card-res-div'>
      <img src={props.image} alt={props.name} />
      <div className='name-chef-div'>
        <Link to={`/restaurant/${props.id}`}>
          <h2>{props.name}</h2>
        </Link>
        <h3>{props.chef}</h3>
      </div>

      {!isMobileScreen() && (
        <div className='stars-div'>
          {fullStars.map((_, index) => (
            <img 
            style={{width:'40px', height:'30px'}}
            key={index} 
            src={'../../images/Icons/fullStar.svg'} alt='full star' />
          ))}
          {emptyStars.map((_, index) => (
            <img 
            style={{width:'40px', height:'30px'}}
            key={index} 
            src={'../../images/Icons/emptyStar.svg'} alt='empty star' />
          ))}
        </div>
      )}
    </div>
  );
}
