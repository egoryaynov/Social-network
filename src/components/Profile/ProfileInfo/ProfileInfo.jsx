import React from 'react';

import './ProfileInfo.scss';
import ProfileStatus from '../ProfileStatus/ProfileStatus';

const ProfileInfo = ({profile, status, updateStatus, authUserID, savePhoto}) => {
        let contacts = [];
        for (let social in profile.contacts) {
            if (profile.contacts[social] !== null) {
                contacts.push({
                    link: profile.contacts[social],
                    social
                })
            }
        }

        const onProfilePhotoSelected = (event) => {
            savePhoto(event.target.files[0]);
        }

        return (
            <div className='profile__info'>
                {profile.photos.large === null
                    ? 'User not upload photo'
                    : <img className='profile__image' src={profile.photos.large} alt="Profile"/>
                }
                {authUserID === profile.userId
                    ? <div><input type="file" onChange={onProfilePhotoSelected}/></div>
                    : null}

                <h3>{profile.fullName}</h3>

                <ProfileStatus status={status} updateStatus={updateStatus}/>

                <h2>Я в соц. сетях:</h2>
                <div className="profile__contacts">
                    {contacts.map((contact) => (
                        <a href={contact.link.includes('https://')
                            ? contact.link
                            : `https://${contact.link}`}
                           className='profile__contacts-item'>{contact.social}</a>)
                    )}
                </div>
                <div className="profile__job">
                    <h2>Интересуют ли вакансии по работе?</h2>
                    <div className="profile__job-status">
                    <span
                        className={`${profile.lookingForAJob
                            ? 'profile__job-status--true'
                            : 'profile__job-status--false'}`}>
                        <b>{profile.lookingForAJob ? 'Да!' : 'Нет :('}</b>
                    </span>
                    </div>
                    <span
                        className='profile__job-description'>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : ''}</span>
                </div>
            </div>
        );
    }
;

export default ProfileInfo;
