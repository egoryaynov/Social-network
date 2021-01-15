import {connect} from "react-redux";
import React from "react";
import axios from "axios";
import {setUserData} from "../../redux/authReducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                debugger

                if (response.data.resultCode === 0) {
                    this.props.setUserData(response.data.data)
                }
            })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login
    }
}
export default connect(mapStateToProps, {
    setUserData
})(HeaderContainer)
