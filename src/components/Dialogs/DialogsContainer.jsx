import Dialogs from "./Dialogs";

import {addMessage, updateMessage} from "../../redux/dialogsReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    }
}

export default connect(mapStateToProps, {updateMessage, addMessage})(Dialogs);
