import { LOGIN } from './../types'

export const login = (displayName, avatarUrl, isLogin) => ({
    type: LOGIN,
    displayName,
    avatarUrl,
    isLogin
})
