import React, { useState } from 'react';
import { Chef } from '../../interfaces/Chef';
import './Chefs.scss'; 
import { isMobileScreen } from "../../utils/utils";

interface Props {
  chefsData: { chefs: Chef[] };
}

const Chefs: React.FC<Props> = ({ chefsData }) => {
  const { chefs } = chefsData;
  const [filter, setFilter] = useState<string>('all');

  // Apply filters based on the selected filter
  const filteredChefs = () => {
    switch (filter) {
      case 'new':
        return chefs.filter(chef => chef.experience < 5);
      case 'mostViewed':
        return chefs.filter(chef => chef.rating > 7).sort((a, b) => b.rating - a.rating);
      default:
        return chefs;
    }
  };
  

  const renderChefs = () => {
    const filtered = filteredChefs();
    return (
      <div className="chef-list">
        {filtered.map((chef) => (
          <div key={chef.id} >
              <div className="chefs-chef-image-data" >
              <img src={chef.image} alt={chef.name} />
              <p>{chef.name}</p>
          </div>
          </div> 
        ))}
      </div> 
    );
  };

  return (
    <div>
    <div className="chefs-container"> 
    {!isMobileScreen() && (<hr style={{ width: '100%', marginBottom:'40px', border: 'none', borderBottom: '1px solid #F2F2F2' }} />)}
      <p className='chefs-chefs-label'>CHEFS</p> 
      <div className="chefs-filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('new')} className={filter === 'new' ? 'active' : ''}>New</button>
        <button onClick={() => setFilter('mostViewed')} className={filter === 'mostViewed' ? 'active' : ''}>Most Viewed</button>
      </div> 
      {renderChefs()}
    </div>
    <hr style={{ width: '100%', margin:0, marginBottom:'5px', border: 'none', borderBottom: '1px solid #F2F2F2' }} />
    </div>
  );
};

export default Chefs;