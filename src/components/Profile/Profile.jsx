import React from 'react';

import './Profile.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = ({profile, status, updateStatus}) => {
    return (
        <div className='profile'>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <PostsContainer/>
        </div>
    );
};

export default Profile;
