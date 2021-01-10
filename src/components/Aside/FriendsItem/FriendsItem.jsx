import React from 'react';
import {NavLink} from "react-router-dom";

import './FriendsItem.scss';

import friendAvatar from '../../../assets/friend-avatar.jpg';

const FriendsItem = ({state}) => {
    return (
        <div className='aside__friends'>
            <NavLink className='aside__friends-title' to='/users'>Users</NavLink>

            <div className="aside__friends-wrapper">
                {state.map(friend => {
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
