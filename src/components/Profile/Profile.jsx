import React from 'react';

import './Profile.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./PostsContainer";

const Profile = ({profile}) => {
    return (
        <div className='profile'>
            <ProfileInfo profile={profile}/>
            <PostsContainer/>
        </div>
    );
};

export default Profile;
