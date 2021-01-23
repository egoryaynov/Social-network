import {connect} from "react-redux";
import FriendsItem from "./FriendsItem/FriendsItem";

const FriendsItemContainer = (props) => {
    return (
        <FriendsItem {...props}/>
    )
}

const mapStateToProps = (state) => {
    return {
        friends: state.sideBar.friends
    }
};

export default connect(mapStateToProps)(FriendsItemContainer);