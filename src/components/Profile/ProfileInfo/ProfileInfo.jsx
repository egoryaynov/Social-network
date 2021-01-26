import React from 'react';

import './ProfileInfo.module.scss';
import ProfileStatus from '../ProfileStatus/ProfileStatus';

import styles from './ProfileInfo.module.scss';
import EditProfileInfo from "./EditProfileInfo";
import ShowProfileInfo from "./ShowProfileInfo";

const ProfileInfo = ({profile, status, updateStatus, authUserID, savePhoto, updateProfileInfo}) => {
    const [editMode, setEditMode] = React.useState(false);

    const onProfilePhotoSelected = (event) => {
        savePhoto(event.target.files[0]);
    };

    const onClickEdit = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
    };

    return (
        <div>
            <div>
                {!profile.photos.large
                    ? 'User not upload photo'
                    : <img className={styles.profileImage} src={profile.photos.large} alt="Profile"/>
                }

                {authUserID === profile.userId &&
                <div>
                    <input type="file" onChange={onProfilePhotoSelected}/>
                </div>
                }

                <h3 className={styles.username}>{profile.fullName}</h3>
                <b className={styles.statusHelper}>Status (You can change that if you click on the message): </b>
                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>

            <p>
                <b>Обо мне: </b>{profile.aboutMe}
            </p>

            {authUserID === profile.userId && !editMode &&
            <button className={styles.button} onClick={onClickEdit}>Edit profile info</button>}


            {editMode
                ? <EditProfileInfo profile={profile} updateProfileInfo={updateProfileInfo}
                                   deactivateEditMode={deactivateEditMode}/>
                : <ShowProfileInfo profile={profile}/>}
        </div>
    );
};


export default ProfileInfo;
