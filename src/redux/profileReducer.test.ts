import profileReducer, {actions, InitialStateType} from "./profileReducer";

const {addPost} = actions;

it('post should be added correctly', () => {
    const state = {
        posts: [
            {id: 1, message: 'It is post number 1', likesCount: 0},
            {id: 2, message: 'It is post number 2', likesCount: 10},
            {id: 3, message: 'It is post number 3', likesCount: 24},
            {id: 4, message: 'It is post number 4', likesCount: 2},
            {id: 5, message: 'It is post number 5', likesCount: 55},
        ]
    } as InitialStateType;

    let newState = profileReducer(state, addPost('POST TEXT'));

    expect(newState.posts[5]).toStrictEqual(({id: 6, message: 'POST TEXT', likesCount: 0}))
})