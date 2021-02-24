import React from 'react';
import './Aside.scss';

import NavListItem from "./NavListItem/NavListItem";

const Aside: React.FC = () => {
    return (
        <aside className='aside'>
            <nav className="nav">
                <ul className="nav__list">
                    <NavListItem link='/profile'/>
                    <NavListItem link='/dialogs' itemName='Messages'/>
                    <NavListItem link='/news'/>
                    <NavListItem link='/music'/>
                    <NavListItem link='/settings'/>
                    <NavListItem link='/users'/>
                </ul>
            </nav>
            {/*/!*TODO ПЕРЕДЕЛАТЬ ВЫВОД ДРУЗЕЙ В ASIDE *!/*/}
            {/*<FriendsItemContainer/>*/}
        </aside>
    );
};

export default Aside;
