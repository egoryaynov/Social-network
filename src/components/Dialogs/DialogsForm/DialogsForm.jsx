import React from 'react';
import {useFormik} from "formik";

const DialogsForm = ({addMessage}) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values, {setSubmitting}) => {
            addMessage(values.message)
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea
                placeholder="Enter your message..."
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
            />
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>
        </form>
    );
};

export default DialogsForm;
