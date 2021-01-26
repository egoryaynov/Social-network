import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS';

const initialState = {
    userID: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
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

const setUserData = (email, id, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userID: id, login, email, isAuth}
});

const getCaptchaSuccess = (captchaUrl) => ({type: GET_CAPTCHA_SUCCESS, captchaUrl})

export const authorization = () => async (dispatch) => {
    let data = await authAPI.getAuth();

    if (data.resultCode === 0) {
        dispatch(setUserData(data.data.email, data.data.id, data.data.login, true))
    }
}

export const getCaptcha = () => async (dispatch) => {
    let data = await securityAPI.getCaptcha();

    dispatch(getCaptchaSuccess(data.url));
}

export const login = (loginInfo) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export default authReducer;