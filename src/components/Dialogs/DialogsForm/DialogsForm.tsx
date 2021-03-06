import React from 'react';
import {FormikProps, useFormik} from "formik";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import * as Yup from "yup";

type PropsType = {
    addMessage: (message: string) => void
}

type ValuesType = {
    message: string
}
const DialogsForm: React.FC<PropsType> = ({addMessage}) => {
    const formik: FormikProps<ValuesType> = useFormik<ValuesType>({
        initialValues: {
            message: ''
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required('This field required'),
        }),
        onSubmit: (values) => {
            addMessage(values.message);
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

            <button type="submit" disabled={formik.isSubmitting || !!formik.errors.message}>
                Submit
            </button>
        </form>
    );
};

export default DialogsForm;
