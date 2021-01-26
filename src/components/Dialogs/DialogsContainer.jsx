import Dialogs from "./Dialogs";

import {addMessage} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const DialogsContainer = (props) => {
    return (
        <Dialogs dialogs={props.dialogs}
                 messages={props.messages}
                 addMessage={props.addMessage}/>
    );
};

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        state: state.dialogsPage
    }
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage})
)(DialogsContainer)
