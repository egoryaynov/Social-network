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
    getState() {
        return this._state;
    },

    _callSubscriber() {
        console.log('render-app');
    },

    addPost() {
        let newPost = {
            id: 6,
            message: this._state.profilePage.postText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);

        this._callSubscriber();
    },
    updatePostText(newPostText) {
        this._state.profilePage.postText = newPostText;

        this._callSubscriber();
    },
    
    addMessage() {
        let newMessage = {
            id: 6,
            text: this._state.dialogsPage.messageText
        };
        this._state.dialogsPage.messages.push(newMessage);

        this._callSubscriber();
    },
    updateMessage(newMessage) {
        debugger
        this._state.dialogsPage.messageText = newMessage;

        this._callSubscriber();
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}


export default store;