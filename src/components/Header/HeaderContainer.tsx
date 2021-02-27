import {connect} from "react-redux";
import React from "react";
import {logout} from "../../redux/authReducer";
import Header from "./Header";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    logout: () => void
}
type PropTypes = MapStateToPropsType & MapDispatchToPropsType

const HeaderContainer: React.FC<PropTypes> = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logout={props.logout}/>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    {logout}
)(HeaderContainer)
