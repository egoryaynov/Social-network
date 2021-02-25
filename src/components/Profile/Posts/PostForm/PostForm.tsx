import React from 'react';
import {FormikProps, useFormik} from "formik";
import ErrorMessage from "../../../common/ErrorMessage/ErrorMessage";
import * as Yup from "yup";

type PropsType = {
    addPost: (postText: string) => void
}

type ValuesType = {
    postText: string
}
const PostForm: React.FC<PropsType> = ({addPost}) => {
    const formik: FormikProps<ValuesType> = useFormik<ValuesType>({
        initialValues: {
            postText: ''
        },
        validationSchema: Yup.object().shape({
            postText: Yup.string().required('This field required'),
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
            <ErrorMessage className=''>{formik.errors.postText}</ErrorMessage>}

            <button type="submit" disabled={formik.isSubmitting || !!formik.errors.postText}>
                Submit
            </button>
        </form>
    );
};

export default PostForm;
