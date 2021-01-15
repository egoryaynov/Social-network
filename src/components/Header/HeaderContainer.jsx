import {connect} from "react-redux";
import React from "react";
import {setUserData} from "../../redux/authReducer";
import Header from "./Header";
import {getAuth} from "../../api/getUsers";

class HeaderContainer extends React.Component {
    componentDidMount() {
        getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.setUserData(data.data)
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
