import Dialogs from "./Dialogs";

import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/dialogsReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeMessage: (text) => {
            dispatch(updateMessageActionCreator(text));
        },
        buttonClick: () => {
            dispatch(addMessageActionCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
