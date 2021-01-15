export const SET_USER_DATA = 'SET_USER_DATA';

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
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

export const setUserData = ({id, login, email}) => ({type: SET_USER_DATA, data: {userID: id, login, email}});

export default authReducer;