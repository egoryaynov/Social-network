import {connect} from "react-redux";
import FriendsItem from "./FriendsItem/FriendsItem";

const mapStateToProps = (state) => {
    return {
        state: state.sideBar.friends
    }
};

export default connect(mapStateToProps)(FriendsItem);