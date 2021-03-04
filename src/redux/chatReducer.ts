import {BaseThunkType, InferActionsTypes} from "./store";
import {chatAPI, ChatMessageApiType, ChatStatusType} from "../api/chat-api";
import {Dispatch} from "redux";

import {v1} from 'uuid';

type ChatMessageType = ChatMessageApiType & { id: string }

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as ChatStatusType
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(message => {
                    return {
                        ...message,
                        id: v1()
                    }
                })]
            }
        }
        case 'chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'chat/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    statusChanged: (status: ChatStatusType) => ({
        type: 'chat/STATUS_CHANGED',
        payload: {status}
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.stop()
        chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async () => {
        chatAPI.sendMessage(message)
    }
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
