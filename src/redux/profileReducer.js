export const ADD_POST = 'ADD-POST';
export const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: state.postText,
                likesCount: 0
            };
            state.posts.push(newPost);
            break;
        case UPDATE_POST_TEXT:
            state.postText = action.newPostText;
            break;
    }

    return state;
}

export default profileReducer;