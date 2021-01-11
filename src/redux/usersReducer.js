const FOLLOW_TOGGLE = 'FOLLOW-TOGGLE';
const SET_USERS = 'SET-USERS';

const initialState = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_TOGGLE: {
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userID
                        ? {...user, followed: !user.followed}
                        : user
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        default:
            return state
    }
}

export const followToggleActionCreator = (userID) => {
    return {type: FOLLOW_TOGGLE, userID}
}
export const setUsersActionCreator = (users) => {
    return {type: SET_USERS, users}
}

export default usersReducer;