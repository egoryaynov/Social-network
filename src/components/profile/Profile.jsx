import React from 'react';

import './Profile.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./PostsContainer";

const Profile = () => {
    return (
        <div className='profile'>
            <ProfileInfo/>
            <PostsContainer/>
        </div>
    );
};

export default Profile;
