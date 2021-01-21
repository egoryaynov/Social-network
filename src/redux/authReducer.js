import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userID: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

export const setUserData = (email, id, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userID: id, login, email, isAuth}
});

export const authorization = () => (dispatch) => {
    return authAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData(data.data.email, data.data.id, data.data.login, true))
            }
        })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    return authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authorization())
            } else {
                throw new Error(data.messages[0])
            }
        })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}

export default authReducer;