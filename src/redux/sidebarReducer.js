const initialState = {
    friends: [
        {id: 1, name: 'Viktor'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Denis'},
        {id: 4, name: 'Ivan'},
        {id: 5, name: 'Kirill'},
        {id: 6, name: 'Dmitry'},
    ]
};

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;