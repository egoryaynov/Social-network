import React from 'react';
import FormLogin from './FormLogin/FormLogin';

import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import {LoginInfoType} from '../../types/types';

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login: (loginInfo: LoginInfoType) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const Login: React.FC<PropsType> = ({login, isAuth, captchaUrl}) => {
    if (isAuth) return <Redirect to='/profile'/>

    return (
        <div className='login'>
            <h1 className='login__title'>LOGIN</h1>
            <FormLogin login={login} captchaUrl={captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    {login}
)(Login) as React.ComponentType;