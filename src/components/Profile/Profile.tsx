import React from 'react';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import {ProfileContainerPropsType} from "./ProfileContainer";

type PropsType = ProfileContainerPropsType
const Profile: React.FC<PropsType> = ({profile, status, updateStatus, authUserID, savePhoto, updateProfileInfo}) => {
    return (
        <div>
            <ProfileInfo savePhoto={savePhoto}
                         authUserID={authUserID}
                         profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         updateProfileInfo={updateProfileInfo}/>
            {/*@ts-ignore*/}
            <PostsContainer/>
        </div>
    );
};

export default Profile;
