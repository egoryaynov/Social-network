import React from 'react';
import {NavLink} from "react-router-dom";

import './FriendsItem.scss';

import friendAvatar from '../../../assets/avatar.png';

const FriendsItem = ({friends}) => {
    return (
        <div className='aside__friends'>
            <NavLink className='aside__friends-title' to='/users'>Users</NavLink>

            <div className="aside__friends-wrapper">
                {friends.map(friend => {
                    return (
                        <NavLink key={friend.id} className="aside__friends-link" to={`/users/${friend.id}`}>
                            <div className='aside__friends-item'>
                                <img className="aside__friends-image" src={friendAvatar} alt={friend.name}/>
                                <span className="aside__friends-name">{friend.name}</span>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default FriendsItem;
