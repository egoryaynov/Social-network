import React from 'react';
import {useFormik} from "formik";
import {required} from "../../../../utils/vilidate";
import ErrorMessage from "../../../common/ErrorMessage/ErrorMessage";

const PostForm = ({addPost}) => {
    const formik = useFormik({
        initialValues: {
            postText: ''
        },
        validate: (values => {
            let errors = {}
            let requiredPostText = required(values.postText)

            if (requiredPostText) errors.postText = requiredPostText

            return errors
        }),
        onSubmit: (values, {setSubmitting}) => {
            setTimeout(() => {
                // EXAMPLE HOW FORMIK MAY WORKS WITH ASYNC
                addPost(values.postText)
                setSubmitting(false);
            }, 2000);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea
                placeholder="Enter your message..."
                name="postText"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postText}
            />
            {formik.errors.postText && formik.touched.postText &&
            <ErrorMessage className='post__text-error'>{formik.errors.postText}</ErrorMessage>}

            <button type="submit" disabled={formik.isSubmitting || formik.errors.postText}>
                Submit
            </button>
        </form>
    );
};

export default PostForm;
