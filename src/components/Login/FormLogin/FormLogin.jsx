import {useFormik} from "formik";
import React from "react";

const FormLogin = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            isRememberMe: false
        },
        onSubmit: (values, {setSubmitting}) => {
            setTimeout(() => {
                // EXAMPLE HOW FORMIK MAY WORKS WITH ASYNC
                console.log(values)
                setSubmitting(false);
            }, 2000);
        }
    });

    return (
        <form className='login__form' onSubmit={formik.handleSubmit}>
            <input
                placeholder="Email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            <input
                placeholder="Пароль"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>
            <input type="checkbox"
                   name="isRememberMe"
                   value={formik.values.isRememberMe}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
            />
        </form>
    );
};

export default FormLogin;