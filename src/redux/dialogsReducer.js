export const ADD_MESSAGE = 'ADD-MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE-MESSAGE';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                text: state.messageText
            };
            state.messages.push(newMessage);
            break;
        case UPDATE_MESSAGE:
            state.messageText = action.newMessage;
            break;
    }

    return state;
}

export default dialogsReducer;