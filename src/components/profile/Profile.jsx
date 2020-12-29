import React from 'react';

import './Profile.scss';

import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({state, addPost, updatePostText}) => {
    return (
        <div className='profile'>
            <ProfileInfo/>
            <Posts state={state} addPost={addPost} updatePostText={updatePostText}/>
        </div>
    );
};

export default Profile;
