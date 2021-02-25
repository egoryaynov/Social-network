import {authorization} from "./authReducer";
import {BaseThunkType} from "./store";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
}


const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initialize = (): ThunkType => {
    return (dispatch) => {
        Promise.all([dispatch(authorization())])
            .then(() => dispatch(initializedSuccess()))
    }
}

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InitializedSuccessActionType
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
type ThunkType = BaseThunkType<ActionsTypes, unknown>