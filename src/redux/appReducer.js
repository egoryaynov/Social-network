import {authorization} from "./authReducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

const initialState = {
    initialized: false
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
}

const initializeSuccess = () => ({type: INITIALIZE_SUCCESS})

export const initialize = () => (dispatch) => {
    Promise.all([dispatch(authorization())])
        .then(() => dispatch(initializeSuccess()))
}

export default dialogsReducer;