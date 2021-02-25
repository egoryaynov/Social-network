import {ProfileType, UpdateProfileInfoPayloadType} from "../types/types";
import {instance, ResponseFromApiType} from "./api";

type SavePhotoResponse = {
    photos: {
        small: string
        large: string
    }
}
export const profileAPI = {
    getUserProfile: (userID: number) => {
        return instance.get<ProfileType>(`profile/${userID}`).then(response => response.data)
    },
    getStatus: (userID: number) => {
        return instance.get<string>(`profile/status/${userID}`).then(response => response.data)
    },
    updateStatus: (status: string) => {
        return instance.put<ResponseFromApiType>('profile/status', {status: status})
    },
    savePhoto: (photoFile: File) => {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<ResponseFromApiType<SavePhotoResponse>>('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    updateProfileInfo: (profileInfo: UpdateProfileInfoPayloadType) => {
        return instance.put<ResponseFromApiType>('profile', profileInfo).then(response => response.data)
    }
}