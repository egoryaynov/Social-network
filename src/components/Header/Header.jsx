import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.scss';

import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header className='header'>
            <NavLink className="header__logo-link" to="/profile">
                <img className='header__logo' src={logo} alt="logotype"/>
            </NavLink>
        </header>
    );
};

export default Header;
