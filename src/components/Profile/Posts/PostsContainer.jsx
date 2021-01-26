import Posts from "./Posts";

import {addPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";

const PostsContainer = (props) => {
    return (
        <Posts posts={props.posts} addPost={props.addPost}/>
    )
}

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts
})
export default connect(mapStateToProps, {
    addPost
})(PostsContainer);
