import Dialogs from "./Dialogs";

import {addMessage, updateMessage} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const DialogsContainer = (props) => {
    return (
        <Dialogs {...props}/>
    );
};

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {updateMessage, addMessage})
)(DialogsContainer)
