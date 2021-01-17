import Dialogs from "./Dialogs";

import {addMessage, updateMessage} from "../../redux/dialogsReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {updateMessage, addMessage})(Dialogs);
