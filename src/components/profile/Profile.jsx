import React from 'react';

import './Profile.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./PostsContainer";

const Profile = ({store}) => {
    return (
        <div className='profile'>
            <ProfileInfo/>
            <PostsContainer store={store}/>
        </div>
    );
};

export default Profile;
