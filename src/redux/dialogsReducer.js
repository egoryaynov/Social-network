export const ADD_MESSAGE = 'ADD-MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE-MESSAGE';

const initialState = {
    messages: [
        {id: 1, text: 'Hello'},
        {id: 2, text: 'How are you?'},
        {id: 3, text: 'Good! And you?'},
        {id: 4, text: 'Kdosakdokdoskdoakd'},
        {id: 5, text: 'Nonononoon koasdaos'},
    ],
    dialogs: [
        {id: 1, name: 'Andrey'},
        {id: 2, name: 'Denis'},
        {id: 3, name: 'Ivan'},
        {id: 4, name: 'Stanislav'},
    ],
    messageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newTextMessage = state.messageText;

            return {
                ...state,
                messageText: '',
                messages: [...state.messages, {id: 6, text: newTextMessage}]
            };
        }
        case UPDATE_MESSAGE: {
            return {
                ...state,
                messageText: action.newMessage
            };
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message) => ({type: UPDATE_MESSAGE, newMessage: message});

export default dialogsReducer;