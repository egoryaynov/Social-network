import {ResultCodesEnum} from "../api/api";
import {
    PhotosType,
    PostType,
    ProfileType,
    UpdateProfileInfoPayloadType
} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./store";
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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD_POST': {
            let newPostText = action.postText;

            return {
                ...state,
                posts: [
                    ...state.posts,
                    {id: state.posts.length + 1, message: newPostText, likesCount: 0}
                ]
            }
        }
        case 'profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'profile/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        case 'profile/UPDATE_PROFILE_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, ...action.profileInfo} as ProfileType
            }
        }
        default:
            return state;
    }
}

export const actions = {
    addPost: (postText: string) => ({
        type: 'profile/ADD_POST',
        postText
    } as const),
    setUserProfile: (profile: ProfileType | null) => ({
        type: 'profile/SET_USER_PROFILE',
        profile
    } as const),
    clearUserProfile: () => actions.setUserProfile(null),
    setStatus: (status: string) => ({
        type: 'profile/SET_STATUS',
        status
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'profile/SAVE_PHOTO_SUCCESS',
        photos
    } as const),
    updateProfileSuccess: (profileInfo: UpdateProfileInfoPayloadType) => ({
        type: 'profile/UPDATE_PROFILE_SUCCESS',
        profileInfo
    } as const)
}

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

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>