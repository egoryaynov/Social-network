import Posts from "./Posts";

import {addPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";

const PostsContainer = (props) => {
    return (
        <Posts {...props}/>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
}

export default connect(mapStateToProps, {
    addPost
})(PostsContainer);
