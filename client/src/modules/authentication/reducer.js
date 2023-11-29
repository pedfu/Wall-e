import { createReducer } from "../../utils/redux";
import cookies from 'react-cookies'
import { LOGIN, LOGOUT, SIGN_UP, FORGOT_PASSWORD, CONFIRM_CODE, UPDATE_PASSWORD } from "./actions";

const INITIAL_STATE = {
    user: cookies.load('user') || null,
    token: cookies.load('token') || null
}

export default createReducer(INITIAL_STATE, {
    [LOGIN.FULFILLED]: (state, action) => {
        const { user, token } = action.payload.data
        cookies.save('user', JSON.stringify(user), '/') // '/' allow cookies to be accessable in all pages
        cookies.save('token', token, '/') // '/' allow cookies to be accessable in all pages
        return { user, token }
    },
    [LOGOUT]: () => {
        cookies.remove('user')
        cookies.remove('token')
        return { user: null, token: null }
    },
    [SIGN_UP.FULFILLED]: (state, action) => {
        const { user, token } = action.payload.data
        cookies.save('user', JSON.stringify(user), '/') // '/' allow cookies to be accessable in all pages
        cookies.save('token', token, '/') // '/' allow cookies to be accessable in all pages
        return { user, token }
    },
    [FORGOT_PASSWORD.FULFILLED]: (state, action) => {
        return state
    },
    [CONFIRM_CODE.FULFILLED]: (state, action) => {
        const { token } = action.payload.data
        cookies.save('token', token, '/')
        return { ...state, token: token }
    },
    [UPDATE_PASSWORD.FULFILLED]: (state, action) => {
        return state
    },
})