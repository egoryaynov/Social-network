import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    let RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to="/login"/>

        return <Component {...props}/>
    }

    return connect(mapStateToProps)(RedirectComponent);
};

