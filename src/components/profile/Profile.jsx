import React from 'react';

import './Profile.scss';

import image from '../../assets/profile-image.jpg';
import Posts from "./Posts/Posts";

const Profile = () => {
    return (
        <div className='profile'>
            <img className='profile__image' src={image} alt="Profile"/>

            <div className="profile__content">
                <div>ava + description</div>
                
                <Posts/>
            </div>
        </div>
    );
};

export default Profile;
