import Dialogs from "./Dialogs";

import {addMessage, updateMessage} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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

let WithAuthRedirect = withAuthRedirect(DialogsContainer);

export default connect(mapStateToProps, {updateMessage, addMessage})(WithAuthRedirect);
