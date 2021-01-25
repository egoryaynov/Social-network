import React from 'react';

import './Profile.scss';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = ({profile, status, updateStatus, authUserID, savePhoto}) => {
    return (
        <div className='profile'>
            <ProfileInfo savePhoto={savePhoto}
                         authUserID={authUserID}
                         profile={profile}
                         status={status}
                         updateStatus={updateStatus}/>
            <PostsContainer/>
        </div>
    );
};

export default Profile;
