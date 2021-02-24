import {authorization} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState;

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

type ActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initialize = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
    return (dispatch) => {
        Promise.all([dispatch(authorization())])
            .then(() => dispatch(initializedSuccess()))
    }
}

export default dialogsReducer;