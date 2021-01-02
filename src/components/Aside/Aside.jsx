import React from 'react';
import './Aside.scss';

import NavListItem from "./NavListItem/NavListItem";
import FriendsItem from "./FriendsItem/FriendsItem.jsx";
import StoreContext from "../../StoreContext";

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
            <StoreContext.Consumer>
                {store => {
                    let state = store.getState();

                    return (
                        <FriendsItem state={state.sideBar.friends}/>
                    )
                }}
            </StoreContext.Consumer>
        </aside>
    );
};

export default Aside;
