import React from 'react';

import './Profile.scss';

import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({dataPosts}) => {
    return (
        <div className='profile'>
            <ProfileInfo/>
            <Posts dataPosts={dataPosts}/>
        </div>
    );
};

export default Profile;
