import React from 'react';
import {useFormik} from "formik";

const PostForm = ({addPost}) => {
    const formik = useFormik({
        initialValues: {
            postText: ''
        },
        onSubmit: (values, {setSubmitting}) => {
            addPost(values.postText)
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
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>
        </form>
    );
};

export default PostForm;
