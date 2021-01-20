import React from 'react';
import FormLogin from './FormLogin/FormLogin';

import './Login.scss';

const Login = () => {
    return (
        <div className='login'>
            <h1 className='login__title'>LOGIN</h1>
            <FormLogin/>
        </div>
    );
};

export default Login;