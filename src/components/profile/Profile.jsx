import React from 'react';

import './Profile.scss';

import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({state}) => {
    return (
        <div className='profile'>
            <ProfileInfo/>
            <Posts state={state}/>
        </div>
    );
};

export default Profile;
