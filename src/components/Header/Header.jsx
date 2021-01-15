import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.scss';

import logo from '../../assets/logo.png';

const Header = ({isAuth, login}) => {
    return (
        <header className='header'>
            <div className="header__logo-wrapper">
                <NavLink className="header__logo-link" to="/profile">
                    <img className='header__logo' src={logo} alt="logotype"/>
                </NavLink>
            </div>
            <div className="header__login">
                {isAuth
                    ? <span className='header__login-success'>{`You login as ${login}`}</span>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;
