import {AppStateType} from "../store";

export const getMessages = (state: AppStateType) => {
    return state.chat.messages
}