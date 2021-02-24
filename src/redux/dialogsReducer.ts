import {DialogType, MessageType} from "../types/types";

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

const initialState = {
    messages: [
        {id: 1, text: 'Hello'},
        {id: 2, text: 'How are you?'},
        {id: 3, text: 'Good! And you?'},
        {id: 4, text: 'Kdosakdokdoskdoakd'},
        {id: 5, text: 'Nonononoon koasdaos'},
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Andrey'},
        {id: 2, name: 'Denis'},
        {id: 3, name: 'Ivan'},
        {id: 4, name: 'Stanislav'},
    ] as Array<DialogType>,
}
export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newId = state.messages.length + 1;

            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: newId, text: action.message}
                ]
            };
        }
        default:
            return state;
    }
}

type AddMessageType = {
    type: typeof ADD_MESSAGE,
    message: string
}
export const addMessage = (message: string): AddMessageType => ({
    type: ADD_MESSAGE,
    message
});

export default dialogsReducer;