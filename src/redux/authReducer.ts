import {ResultCodesEnum, ResultCodesForCaptcha} from "../api/api";
import {LoginInfoType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";
import {securityAPI} from "../api/security-api";
import {authAPI} from "../api/auth-api";

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
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'GET_CAPTCHA_SUCCESS': {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    setUserData: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userID: id, login, email, isAuth}
    } as const),
    getCaptchaSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_SUCCESS',
        captchaUrl
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authorization = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.getAuth();

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setUserData(data.data.email, data.data.id, data.data.login, true))
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptcha();

        dispatch(actions.getCaptchaSuccess(data.url));
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
            dispatch(actions.setUserData(null, null, null, false))
        }
    }
}

export default authReducer;