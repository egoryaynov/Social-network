import React from "react";
import Dialogs from "./Dialogs";

import {addMessage} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {DialogType, MessageType} from "../../types/types";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
type MapDispatchToPropsType = {
    addMessage: (message: string) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const DialogsContainer: React.FC<PropsType> = ({dialogs, messages, addMessage}) => {
    return (
        <Dialogs dialogs={dialogs}
                 messages={messages}
                 addMessage={addMessage}/>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    }
}
export default compose(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(
        mapStateToProps, {addMessage}
    )
)(DialogsContainer)