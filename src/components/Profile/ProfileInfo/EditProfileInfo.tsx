import React from 'react';
import {FormikProps, useFormik} from "formik";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import style from "./ProfileInfo.module.scss";
import {ContactsType, ProfileType, UpdateProfileInfoPayloadType} from "../../../types/types";

const prepareDataForRequest = (dataForRequest: UpdateProfileInfoPayloadType): UpdateProfileInfoPayloadType => {
    let requestPayload: UpdateProfileInfoPayloadType = {
        contacts: dataForRequest.contacts
    };

    if (dataForRequest.lookingForAJob) requestPayload.lookingForAJob = dataForRequest.lookingForAJob;
    if (dataForRequest.lookingForAJobDescription) requestPayload.lookingForAJobDescription = dataForRequest.lookingForAJobDescription;
    if (dataForRequest.fullName) requestPayload.fullName = dataForRequest.fullName;
    if (dataForRequest.aboutMe) requestPayload.aboutMe = dataForRequest.aboutMe;

    return requestPayload;
};

type PropsType = {
    profile: ProfileType
    updateProfileInfo: (profileInfo: UpdateProfileInfoPayloadType) => void
    deactivateEditMode: () => void
}

type ValuesType = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}
const EditProfileInfo: React.FC<PropsType> = ({profile, updateProfileInfo, deactivateEditMode}) => {
    const formik: FormikProps<ValuesType> = useFormik<ValuesType>({
        initialValues: {
            aboutMe: profile.aboutMe || '',
            contacts: profile.contacts,
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription || ''
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

            {!!formik.status && <ErrorMessage className=''>{formik.status}</ErrorMessage>}

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
                            value={formik.values.contacts[social as keyof ContactsType] || ''}/>
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
