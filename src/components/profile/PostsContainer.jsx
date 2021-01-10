import Posts from "./Posts/Posts";

import {addPostActionCreator, updatePostTextActionCreator} from "../../redux/profileReducer";
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

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
