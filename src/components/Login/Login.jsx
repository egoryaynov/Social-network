import React from 'react';
import FormLogin from './FormLogin/FormLogin';

import './Login.scss';
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const Login = ({login, isAuth}) => {
    if (isAuth) return <Redirect to='/profile'/>

    return (
        <div className='login'>
            <h1 className='login__title'>LOGIN</h1>
            <FormLogin login={login}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);