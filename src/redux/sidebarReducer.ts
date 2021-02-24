import {FriendType} from "../types/types";

const initialState = {
    friends: [
        {id: 1, name: 'Viktor'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Denis'},
        {id: 4, name: 'Ivan'},
        {id: 5, name: 'Kirill'},
        {id: 6, name: 'Dmitry'},
    ] as Array<FriendType>
};
export type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: unknown) => {
    return state;
};

export default sidebarReducer;