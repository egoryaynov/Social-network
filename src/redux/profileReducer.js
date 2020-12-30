export const ADD_POST = 'ADD-POST';
export const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

const initialState = {
    posts: [
        {id: 1, message: 'It is post number 1', likesCount: '0'},
        {id: 2, message: 'It is post number 2', likesCount: '10'},
        {id: 3, message: 'It is post number 3', likesCount: '24'},
        {id: 4, message: 'It is post number 4', likesCount: '2'},
        {id: 5, message: 'It is post number 5', likesCount: '55'},
    ],
    postText: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: state.postText,
                likesCount: 0
            };
            state.posts.push(newPost);
            return state;
        case UPDATE_POST_TEXT:
            state.postText = action.newPostText;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newPostText: text});

export default profileReducer;