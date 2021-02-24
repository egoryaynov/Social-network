import {profileAPI} from "../api/api";
import {
    PhotosType,
    PostType,
    ProfileType,
    UpdateProfileInfoPayloadType
} from "../types/types";

const ADD_POST = 'profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';

const initialState = {
    posts: [
        {id: 1, message: 'It is post number 1', likesCount: 0},
        {id: 2, message: 'It is post number 2', likesCount: 10},
        {id: 3, message: 'It is post number 3', likesCount: 24},
        {id: 4, message: 'It is post number 4', likesCount: 2},
        {id: 5, message: 'It is post number 5', likesCount: 55},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                profile: {...state.profile, photos: action.photos} as ProfileType
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

type AddPostActionType = {
    type: typeof ADD_POST,
    postText: string
}
export const addPost = (postText: string): AddPostActionType => ({type: ADD_POST, postText});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType | null
}
export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});

export const clearUserProfile = () => setUserProfile(null);

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});


type UpdateProfileSuccessType = {
    type: typeof UPDATE_PROFILE_SUCCESS,
    profileInfo: UpdateProfileInfoPayloadType
}
export const updateProfileSuccess = (profileInfo: UpdateProfileInfoPayloadType): UpdateProfileSuccessType => ({
    type: UPDATE_PROFILE_SUCCESS,
    profileInfo
});

export const getUserProfile = (userID: number) => async (dispatch: any) => {
    let data = await profileAPI.getUserProfile(userID)

    dispatch(setUserProfile(data))
}

export const getStatus = (userID: number) => async (dispatch: any) => {
    let status = await profileAPI.getStatus(userID)

    dispatch(setStatus(status))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (photoFile: File) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(photoFile);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const updateProfileInfo = (profileInfo: UpdateProfileInfoPayloadType) => async (dispatch: any) => {
    const data = await profileAPI.updateProfileInfo(profileInfo);

    if (data.resultCode === 0) {
        dispatch(updateProfileSuccess((profileInfo)));
    } else {
        throw new Error(data.messages[0])
    }
}

export default profileReducer;