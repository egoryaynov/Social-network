import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.scss';

import logo from '../../assets/logo.png';

const Header = ({isAuth, login, logout}) => {
    return (
        <header className='header'>
            <div className="header__logo-wrapper">
                <NavLink className="header__logo-link" to="/profile">
                    <img className='header__logo' src={logo} alt="logotype"/>
                </NavLink>
            </div>
            <div className="header__login">
                {isAuth
                    ? <Logged login={login} logout={logout}/>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    );
};

const Logged = ({login, logout}) => {
    return (
        <div>
            <span className='header__login-name'>{`You login as ${login}`}</span>
            <button type='button' onClick={logout}>Logout</button>
        </div>
    )
}

export default Header;
