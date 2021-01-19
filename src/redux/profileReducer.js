import {profileAPI} from "../api/api";

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_STATUS = 'SET_STATUS';

const initialState = {
    posts: [
        {id: 1, message: 'It is post number 1', likesCount: 0},
        {id: 2, message: 'It is post number 2', likesCount: 10},
        {id: 3, message: 'It is post number 3', likesCount: 24},
        {id: 4, message: 'It is post number 4', likesCount: 2},
        {id: 5, message: 'It is post number 5', likesCount: 55},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPostText = action.postText;

            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, message: newPostText, likesCount: 0}]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPost = (postText) => ({type: ADD_POST, postText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userID) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userID)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }
}

export const getStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getStatus(userID)
            .then(status => {
                dispatch(setStatus(status))
            })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(() => {
                dispatch(setStatus(status))
            })
    }
}

export default profileReducer;