import {connect} from "react-redux";
import FriendsItem from "./FriendsItem/FriendsItem";

const mapStateToProps = (state) => {
    return {
        state: state.sideBar.friends
    }
};

const FriendsItemContainer = connect(mapStateToProps)(FriendsItem);

export default FriendsItemContainer;