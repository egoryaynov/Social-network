const FOLLOW_TOGGLE = 'FOLLOW-TOGGLE';
const SET_USERS = 'SET-USERS';

const initialState = {
    users: [
        {
            id: 1,
            avatar: 'https://img2.freepng.ru/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg',
            followed: false,
            fullName: 'Dmitry K.',
            status: 'i am a boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            avatar: 'https://img2.freepng.ru/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg',
            followed: true,
            fullName: 'Alex',
            status: 'Be happy',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 3,
            avatar: 'https://img2.freepng.ru/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg',
            followed: true,
            fullName: 'Lisa',
            status: 'i am a princess',
            location: {city: 'Kiev', country: 'Ukraine'}
        },
        {
            id: 4,
            avatar: 'https://img2.freepng.ru/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg',
            followed: false,
            fullName: 'Denis',
            status: 'My world',
            location: {city: 'Bercelona', country: 'Spain'}
        }
    ]
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