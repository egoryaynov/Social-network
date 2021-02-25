import axios from "axios";
import {LoginInfoType, ProfileType, UpdateProfileInfoPayloadType, UserType} from "../types/types";

const API_KEY = '57abead5-1e9d-4267-834c-63b518df6e79';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': API_KEY
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

type GetUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type DeleteFollowResponse = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type PostFollowResponse = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const usersAPI = {
    getUsers: (page: number, pageSize: number) => {
        return instance.get<GetUsersResponse>(`users?page=${page}&count=${pageSize}`).then(response => response.data)
    },
    deleteFollow: (userID: number) => {
        return instance.delete<DeleteFollowResponse>(`follow/${userID}`)
    },
    postFollow: (userID: number) => {
        return instance.post<PostFollowResponse>(`follow/${userID}`, {})
    }
}

type GetProfileResponse = {
    data: ProfileType
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type UpdateStatusResponse = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type SavePhotoResponse = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type UpdateProfileInfoResponse = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const profileAPI = {
    getUserProfile: (userID: number) => {
        return instance.get<GetProfileResponse>(`profile/${userID}`).then(response => response.data.data)
    },
    getStatus: (userID: number) => {
        return instance.get<string>(`profile/status/${userID}`).then(response => response.data)
    },
    updateStatus: (status: string) => {
        return instance.put<UpdateStatusResponse>('profile/status', {status: status})
    },
    savePhoto: (photoFile: File) => {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<SavePhotoResponse>('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    updateProfileInfo: (profileInfo: UpdateProfileInfoPayloadType) => {
        return instance.put<UpdateProfileInfoResponse>('profile', profileInfo).then(response => response.data)
    }
}

type AuthMeResponse = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponse = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodesForCaptcha
    messages: Array<string>
}
type LogoutResponse = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    getAuth: () => {
        return instance.get<AuthMeResponse>(`auth/me`).then(response => response.data)
    },
    login: (loginInfo: LoginInfoType) => {
        return instance.post<LoginResponse>('/auth/login', loginInfo).then(response => response.data)
    },
    logout: () => {
        return instance.delete<LogoutResponse>('/auth/login').then(response => response.data)
    }
}

type GetCaptchaResponse = {
    url: string
}
export const securityAPI = {
    getCaptcha: () => {
        return instance.get<GetCaptchaResponse>('security/get-captcha-url').then(response => response.data)
    }
}