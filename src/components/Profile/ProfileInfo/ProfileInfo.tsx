import React, {ChangeEvent} from 'react';

import './ProfileInfo.module.scss';
import ProfileStatus from '../ProfileStatus/ProfileStatus';

import styles from './ProfileInfo.module.scss';
import EditProfileInfo from "./EditProfileInfo";
import ShowProfileInfo from "./ShowProfileInfo";
import {ProfileType, UpdateProfileInfoPayloadType} from "../../../types/types";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";

type PropsType = {
    profile: ProfileType | null
    status: string
    authUserID: number | null

    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    updateProfileInfo: (profileInfo: UpdateProfileInfoPayloadType) => void
}
const ProfileInfo: React.FC<PropsType> = ({
                                              profile,
                                              status,
                                              updateStatus,
                                              authUserID,
                                              savePhoto,
                                              updateProfileInfo
                                          }) => {
    const [editMode, setEditMode] = React.useState(false);

    const [isOwner, setIsOwner] = React.useState<boolean>();
    React.useEffect(() => {
        if (profile !== null) {
            setIsOwner(authUserID === profile.userId)
        }
    }, [authUserID, profile])

    const onProfilePhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files !== null) {
            savePhoto(files[0]);
        }
    };

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
    };

    if (profile === null) return <ErrorMessage className=''/>
    return (
        <div>
            <div>
                {!profile.photos.large
                    ? 'User not upload photo'
                    : <img className={styles.profileImage} src={profile.photos.large} alt="Profile"/>
                }

                {isOwner && <div>
                    <input type="file" onChange={onProfilePhotoSelected}/>
                </div>}

                <h3 className={styles.username}>{profile.fullName}</h3>

                {isOwner && <b
                    className={styles.statusHelper}>Status (You can change that if you click on the message): </b>
                }

                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>

            <div><b>Обо мне: </b>{profile.aboutMe}</div>

            {isOwner && !editMode && <button className={styles.button}
                                             onClick={activateEditMode}>Edit profile info</button>}

            {editMode
                ? <EditProfileInfo profile={profile} updateProfileInfo={updateProfileInfo}
                                   deactivateEditMode={deactivateEditMode}/>
                : <ShowProfileInfo profile={profile}/>}
        </div>
    );
};


export default ProfileInfo;
