import {connect} from "react-redux";
import React from "react";
import {logout} from "../../redux/authReducer";
import Header from "./Header";

const HeaderContainer = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logout={props.logout}/>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {logout})(HeaderContainer)
