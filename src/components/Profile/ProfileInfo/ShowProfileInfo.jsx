import React from 'react';
import style from "./ProfileInfo.module.scss";

const ShowProfileInfo = ({profile, contacts}) => {
    return (
        <>
            {contacts.length !== 0
                ? <div>
                    <h2>Я в соц. сетях:</h2>
                    <div className={style.contacts}>
                        {contacts.map((contact) => (
                                <div className={style.contactsWrapper}>
                                    <b>{contact.social + ': '}</b>
                                    <a href={contact.link.includes('https://')
                                        ? contact.link
                                        : `https://${contact.link}`}
                                       className={style.contactsItem}>{contact.link}</a>
                                </div>
                            )
                        )}
                    </div>
                </div>
                : null}

            <div className={style.job}>
                <h2>Интересуют ли вакансии по работе?</h2>

                <div className={style.jobStatus}>
                    <span
                        className={profile.lookingForAJob
                            ? `${style.jobStatusTrue} ${style.jobStatus}`
                            : `${style.jobStatusFalse} ${style.jobStatus}`}>
                        <b>{profile.lookingForAJob ? 'Да!' : 'Нет :('}</b>
                    </span>
                </div>
                <span className='profile__job-description'>{profile.lookingForAJobDescription}</span>
            </div>
        </>
    );
};

export default ShowProfileInfo;
