import { createReducer } from "../../utils/redux";
import cookies from 'react-cookies'
import { LOGIN, LOGOUT, SIGN_UP } from "./actions";

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
        console.log(action.payload)
        cookies.save('user', JSON.stringify(user), '/') // '/' allow cookies to be accessable in all pages
        cookies.save('token', token, '/') // '/' allow cookies to be accessable in all pages
        return { user, token }
    }
})