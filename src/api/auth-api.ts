import {LoginInfoType} from "../types/types";
import {instance, ResponseFromApiType, ResultCodesEnum, ResultCodesForCaptcha} from "./api";

type AuthMeResponse = {
    id: number
    email: string
    login: string
}
type LoginResponse = ResponseFromApiType<{ userId: number }, ResultCodesEnum | ResultCodesForCaptcha>

export const authAPI = {
    getAuth: () => {
        return instance.get<ResponseFromApiType<AuthMeResponse>>(`auth/me`).then(response => response.data)
    },
    login: (loginInfo: LoginInfoType) => {
        return instance.post<LoginResponse>('/auth/login', loginInfo).then(response => response.data)
    },
    logout: () => {
        return instance.delete<ResponseFromApiType>('/auth/login').then(response => response.data)
    }
}