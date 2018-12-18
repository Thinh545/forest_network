let initialState = {
    displayName: 'HoaMi0Hot',
    avatarUrl: 'anonymous.png',
    isLogin: true
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