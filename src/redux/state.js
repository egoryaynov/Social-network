import profileReducer, {ADD_POST, UPDATE_POST_TEXT} from "./profileReducer";
import dialogsReducer, {ADD_MESSAGE, UPDATE_MESSAGE} from "./dialogsReducer";

let store = {
    _state: {
        dialogsPage: {
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
        },
        profilePage: {
            posts: [
                {id: 1, message: 'It is post number 1', likesCount: '0'},
                {id: 2, message: 'It is post number 2', likesCount: '10'},
                {id: 3, message: 'It is post number 3', likesCount: '24'},
                {id: 4, message: 'It is post number 4', likesCount: '2'},
                {id: 5, message: 'It is post number 5', likesCount: '55'},
            ],
            postText: ''
        },
        sideBar: {
            friends: [
                {id: 1, name: 'Viktor'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Denis'},
                {id: 4, name: 'Ivan'},
                {id: 5, name: 'Kirill'},
                {id: 6, name: 'Dmitry'},
            ]
        }
    },
    _callSubscriber() {
        console.log('render-app');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber();
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newPostText: text});

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageActionCreator = (message) => ({type: UPDATE_MESSAGE, newMessage: message});

export default store;