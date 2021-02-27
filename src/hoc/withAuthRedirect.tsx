import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/store";

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStateType = {
    isAuth: boolean
}
type MapDispatchType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    let RedirectComponent: React.FC<MapStateType & MapDispatchType> = (props) => {
        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to="/login"/>

        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<MapStateType, MapDispatchType, WCP, AppStateType>(mapStateToProps)(RedirectComponent);
};

