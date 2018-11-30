let initialState = {
    displayName: 'ABC',
    avatarUrl: '',
    isLogin: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLogin: action.isLogin }
        default:
            return state
    }
}

export default auth;