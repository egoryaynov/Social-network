import React from 'react';
import {useFormik} from "formik";
import {required} from "../../../utils/vilidate";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";

const DialogsForm = ({addMessage}) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validate: (values => {
            let errors = {}
            let requiredMessage = required(values.message)

            if (requiredMessage) errors.message = requiredMessage

            return errors
        }),
        onSubmit: (values, {setSubmitting}) => {
            setTimeout(() => {
                // EXAMPLE HOW FORMIK MAY WORKS WITH ASYNC
                addMessage(values.message)
                setSubmitting(false);
            }, 2000);
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
            {formik.errors.message && formik.touched.message &&
            <ErrorMessage className='dialogs__text-error'>{formik.errors.message}</ErrorMessage>}

            <button type="submit" disabled={formik.isSubmitting || formik.errors.message}>
                Submit
            </button>
        </form>
    );
};

export default DialogsForm;
