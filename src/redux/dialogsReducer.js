const ADD_MESSAGE = 'ADD_MESSAGE';

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
}

const dialogsReducer = (state = initialState, action) => {
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

export const addMessage = (message) => ({type: ADD_MESSAGE, message});

export default dialogsReducer;