import React from 'react';
import style from "./ProfileInfo.module.scss";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}
const ShowProfileInfo: React.FC<PropsType> = ({profile}) => {
    return (
        <>
            {Object.keys(profile.contacts).length !== 0 &&
            <div>
                <h2>Я в соц. сетях:</h2>
                <div className={style.contacts}>
                    {/*Display not empty social links*/}
                    {Object.keys(profile.contacts).map(social => {
                        if (profile.contacts[social as keyof ContactsType] === null) return null

                        return <div className={style.contactsWrapper}>
                            <b>{`${social}: `}</b>

                            {/* @ts-ignore */}
                            <a href={profile.contacts[social as keyof ContactsType]}
                               className={style.contactsItem}>{profile.contacts[social as keyof ContactsType]}</a>
                        </div>
                    })}
                </div>
            </div>}

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
                <span>{profile.lookingForAJobDescription}</span>
            </div>
        </>
    );
};

export default ShowProfileInfo;
