import React from 'react';
import {useFormik} from "formik";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import style from "./ProfileInfo.module.scss";

const prepareDataForRequest = ({lookingForAJob, lookingForAJobDescription, fullName, aboutMe, contacts}) => {
    const requestPayload = {};
    if (lookingForAJob) requestPayload.lookingForAJob = lookingForAJob;
    if (lookingForAJobDescription) requestPayload.lookingForAJobDescription = lookingForAJobDescription;
    if (fullName) requestPayload.fullName = fullName;
    if (aboutMe) requestPayload.aboutMe = aboutMe;

    requestPayload.contacts = contacts;

    return requestPayload;
};

const EditProfileInfo = ({profile, updateProfileInfo, deactivateEditMode}) => {
    const formik = useFormik({
        initialValues: {
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            contacts: {...profile.contacts}
        },
        onSubmit: async (values, {setStatus}) => {
            try {
                await updateProfileInfo(prepareDataForRequest(values));
                deactivateEditMode();
            } catch (error) {
                setStatus(error.message);
            }
        }
    });

    return (
        <form className={style.editMode} onSubmit={formik.handleSubmit}>
            <div>
                <button className={style.button} type="submit">Save</button>
                <button className={style.button} onClick={deactivateEditMode}>Cancel</button>
            </div>

            {!!formik.status && <ErrorMessage>{formik.status}</ErrorMessage>}

            <div>
                <b>Full name: </b>
                <input type="text"
                       placeholder="Full name"
                       name="fullName"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.fullName}/>
            </div>
            <div className={style.aboutMe}>
                <b>About me: </b>
                <input type="text"
                       placeholder="About me"
                       name="aboutMe"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.aboutMe}/>
            </div>

            <div className={style.contacts}>
                {Object.keys(formik.values.contacts).map((social, index) => {
                    return <div key={index} className={style.contactsItem}>
                        <b>{social}</b>
                        <input
                            placeholder={social}
                            type="text"
                            name={`contacts.${social}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contacts[social]}/>
                    </div>
                })}
            </div>

            <div>
                <label htmlFor="lookingJob">Do you looking job?</label>
                <input
                    id="lookingJob"
                    type="checkbox"
                    name="lookingForAJob"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.lookingForAJob}
                    value={formik.values.lookingForAJob}
                />
            </div>

            {formik.values.lookingForAJob &&
            <textarea
                placeholder="Looking for a job description"
                name="lookingForAJobDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lookingForAJobDescription}/>}
        </form>
    );
};

export default EditProfileInfo;
