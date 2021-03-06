import React from 'react';

import preloaderImage from '../../../assets/Preloader.svg';

const Preloader: React.FC = () => {
    return (
        <div className='preloader'>
            <img src={preloaderImage} alt="Loading...."/>
        </div>
    );
};

export default Preloader;
