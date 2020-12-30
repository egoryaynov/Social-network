import React from 'react';
import './Aside.scss';

import NavListItem from "./NavListItem/NavListItem";
import FriendsItem from "./FriendsItem/FriendsItem.jsx";

const Aside = ({state}) => {

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
            <FriendsItem state={state.friends}/>
        </aside>
    );
};

export default Aside;
