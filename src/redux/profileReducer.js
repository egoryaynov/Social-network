import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

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
                posts: [
                    ...state.posts,
                    {id: state.posts.length + 1, message: newPostText, likesCount: 0}
                ]
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case UPDATE_PROFILE_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, ...action.profileInfo}
            }
        }
        default:
            return state;
    }
}

export const addPost = (postText) => ({type: ADD_POST, postText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const clearUserProfile = () => setUserProfile(null);
export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const updateProfileSuccess = (profileInfo) => ({type: UPDATE_PROFILE_SUCCESS, profileInfo});

export const getUserProfile = (userID) => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userID)

    dispatch(setUserProfile(data))
}

export const getStatus = (userID) => async (dispatch) => {
    let status = await profileAPI.getStatus(userID)

    dispatch(setStatus(status))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (photoFile) => async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const updateProfileInfo = (profileInfo) => async (dispatch) => {
    const data = await profileAPI.updateProfileInfo(profileInfo);

    if (data.resultCode === 0) {
        dispatch(updateProfileSuccess((profileInfo)));
    } else {
        throw new Error(data.messages[0])
    }
}

export default profileReducer;