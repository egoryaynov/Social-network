import {authAPI, securityAPI} from "../api/api";
import {LoginInfoType} from "../types/types";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'auth/GET_CAPTCHA_SUCCESS';

const initialState = {
    userID: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_CAPTCHA_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state
    }
}

type SetUserDataType = {
    type: typeof SET_USER_DATA,
    payload: {
        userID: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean | null,
    }
}
const setUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean): SetUserDataType => ({
    type: SET_USER_DATA,
    payload: {userID: id, login, email, isAuth}
});

type GetCaptchaSuccessType = {
    type: typeof GET_CAPTCHA_SUCCESS,
    captchaUrl: string
}
const getCaptchaSuccess = (captchaUrl: string): GetCaptchaSuccessType => ({
    type: GET_CAPTCHA_SUCCESS,
    captchaUrl
});

export const authorization = () => async (dispatch: any) => {
    let data = await authAPI.getAuth();

    if (data.resultCode === 0) {
        dispatch(setUserData(data.data.email, data.data.id, data.data.login, true))
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    let data = await securityAPI.getCaptcha();

    dispatch(getCaptchaSuccess(data.url));
}

export const login = (loginInfo: LoginInfoType) => async (dispatch: any) => {
    let data = await authAPI.login(loginInfo);

    if (data.resultCode === 0) {
        dispatch(authorization())
    } else if (data.resultCode === 10) {
        await dispatch(getCaptcha())

        throw new Error(data.messages[0])
    } else {
        throw new Error(data.messages[0])
    }
}

export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export default authReducer;