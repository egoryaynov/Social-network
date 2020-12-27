import React from 'react';

import './Header.scss';

import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt="logotype"/>
        </header>
    );
};

export default Header;
