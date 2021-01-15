import React from 'react';

import './ProfileInfo.scss';

const ProfileInfo = ({profile}) => {
    let contacts = [];
    for (let social in profile.contacts) {
        if (profile.contacts[social] !== null) {
            contacts.push({
                link: profile.contacts[social],
                social
            })
        }
    }

    return (
        <div className='profile__info'>
            {profile.photos.large === null
                ? 'User not upload photo'
                : <img className='profile__image' src={profile.photos.large} alt="Profile"/>
            }
            <h3>{profile.fullName}</h3>

            <div className="profile__description">{`Обо мне: ${profile.aboutMe}`}</div>
            <h2>Я в соц. сетях:</h2>
            <div className="profile__contacts">
                {contacts.map((contact) => <a href={`https://${contact.link}`}
                                              className='profile__contacts-item'>{contact.social}</a>)}
            </div>
            <div className="profile__job">
                <h2>Интересуют ли вакансии по работе?</h2>
                <div className="profile__job-status">
                    <span
                        className={`${profile.lookingForAJob ? 'profile__job-status--true' : 'profile__job-status--false'}`}>
                        <b>{profile.lookingForAJob ? 'Да!' : 'Нет :('}</b>
                    </span>
                </div>
                <span
                    className='profile__job-description'>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : ''}</span>
            </div>
        </div>
    );
};

export default ProfileInfo;
