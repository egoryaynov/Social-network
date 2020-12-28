import React from 'react';
import './Aside.scss';
import {NavLink} from "react-router-dom";

const Aside = () => {
    return (
        <aside className='aside'>
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink to="/profile" className="nav__link">Profile</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/dialogs" className="nav__link">Messages</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/news" className="nav__link">News</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/music" className="nav__link">Music</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink to="/settings" className="nav__link">Settings</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Aside;
