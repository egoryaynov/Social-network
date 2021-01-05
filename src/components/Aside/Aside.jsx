import React from 'react';
import './Aside.scss';

import NavListItem from "./NavListItem/NavListItem";
import FriendsItemContainer from "./FriendsItemContainer";

const Aside = () => {
    return (
        <aside className='aside'>
            <nav className="nav">
                <ul className="nav__list">
                    <NavListItem link='/profile'/>
                    <NavListItem link='/dialogs' itemName='Messages'/>
                    <NavListItem link='/news'/>
                    <NavListItem link='/music'/>
                    <NavListItem link='/settings'/>
                </ul>
            </nav>
            <FriendsItemContainer/>
        </aside>
    );
};

export default Aside;
