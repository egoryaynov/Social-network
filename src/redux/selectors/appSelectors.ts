import {AppStateType} from "../store";

export const getInitialized = (state: AppStateType) => {
    return state.app.initialized
}