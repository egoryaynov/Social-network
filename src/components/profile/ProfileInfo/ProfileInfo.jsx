import React from 'react';
import image from "../../../assets/profile-image.jpg";

import './ProfileInfo.scss';

const ProfileInfo = () => {
    return (
        <div className='profile__info'>
            <img className='profile__image' src={image} alt="Profile"/>

            <div className="profile__description">
                <div>ava + description</div>
            </div>
        </div>
    );
};

export default ProfileInfo;
