import React from 'react';
import './HomePageSearchBox.scss';

const HomePageSearchBox: React.FC = () => {
    return (
        <div className='hero-pic-div'>
            <div className='hero-div'>
                <p>
                    Epicure works with the top chef restaurants in Tel Aviv
                </p>
                <div className='home-page-input-search'>
                    <input placeholder='Search for restaurant cuisine, chef' />
                    <img  src='../images/Icons/mini_glass.svg' alt='Search Icon' />
                </div>
            </div>
        </div>
    );
}

export default HomePageSearchBox;
