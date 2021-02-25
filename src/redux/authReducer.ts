import {authAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI} from "../api/api";
import {LoginInfoType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

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

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetUserDataActionType
    | GetCaptchaSuccessActionType

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: {
        userID: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean,
    }
}
const setUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean): SetUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userID: id, login, email, isAuth}
});

type GetCaptchaSuccessActionType = {
    type: typeof GET_CAPTCHA_SUCCESS,
    captchaUrl: string
}
const getCaptchaSuccess = (captchaUrl: string): GetCaptchaSuccessActionType => ({
    type: GET_CAPTCHA_SUCCESS,
    captchaUrl
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authorization = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.getAuth();

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserData(data.data.email, data.data.id, data.data.login, true))
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptcha();

        dispatch(getCaptchaSuccess(data.url));
    }
}

export const login = (loginInfo: LoginInfoType): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.login(loginInfo);

        if (data.resultCode === ResultCodesEnum.Success) {
            await dispatch(authorization())
        } else if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptcha())

            throw new Error(data.messages[0])
        } else {
            throw new Error(data.messages[0])
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.logout()

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}

export default authReducer;