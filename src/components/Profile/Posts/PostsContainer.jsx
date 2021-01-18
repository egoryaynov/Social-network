import Posts from "./Posts";

import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changePost: (text) => {
            dispatch(updatePostTextActionCreator(text));
        },
        buttonClick: () => {
            dispatch(addPostActionCreator());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
