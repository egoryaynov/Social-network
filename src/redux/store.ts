import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./appReducer";

let rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

let store = createStore(rootReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export type AppStateType = ReturnType<typeof rootReducer>;

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export default store;