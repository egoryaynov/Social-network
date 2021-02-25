import {ResultCodesEnum} from "../api/api";
import {
    PhotosType,
    PostType,
    ProfileType,
    UpdateProfileInfoPayloadType
} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";
import {profileAPI} from "../api/profile-api";

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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPostText = action.postText;

            return {
                ...state,
                posts: [
                    ...state.posts,
                    {id: state.posts.length + 1, message: newPostText, likesCount: 0}
                ]
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        case 'UPDATE_PROFILE_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, ...action.profileInfo} as ProfileType
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (postText: string) => ({
        type: 'ADD_POST',
        postText
    } as const),
    setUserProfile: (profile: ProfileType | null) => ({
        type: 'SET_USER_PROFILE',
        profile
    } as const),
    clearUserProfile: () => actions.setUserProfile(null),
    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SAVE_PHOTO_SUCCESS',
        photos
    } as const),
    updateProfileSuccess: (profileInfo: UpdateProfileInfoPayloadType) => ({
        type: 'UPDATE_PROFILE_SUCCESS',
        profileInfo
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userID: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserProfile(userID)

        dispatch(actions.setUserProfile(data))
    }
}

export const getStatus = (userID: number): ThunkType => {
    return async (dispatch) => {
        let status = await profileAPI.getStatus(userID)

        dispatch(actions.setStatus(status))
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.updateStatus(status);

        if (data.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    }
}

export const savePhoto = (photoFile: File): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.savePhoto(photoFile);

        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const updateProfileInfo = (profileInfo: UpdateProfileInfoPayloadType): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.updateProfileInfo(profileInfo);

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.updateProfileSuccess((profileInfo)));
        } else {
            throw new Error(data.messages[0])
        }
    }
}

export default profileReducer;