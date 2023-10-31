import { createReducer } from "../../utils/redux";
import cookies from 'react-cookies'
import { LOGIN, LOGOUT } from "./actions";

const INITIAL_STATE = {
    user: cookies.load('user') || null,
    key: cookies.load('key') || null
}

export default createReducer(INITIAL_STATE, {
    [LOGIN.FULFILLED]: (state, action) => {
        console.log(action.payload)
        const { user, key } = action.payload.data
        cookies.save('user', JSON.stringify(user), '/') // '/' allow cookies to be accessable in all pages
        cookies.save('key', key, '/') // '/' allow cookies to be accessable in all pages
        return { user, key }
    },
    [LOGOUT]: () => {
        cookies.remove('user')
        cookies.remove('key')
        return { user: null, key: null }
    }
})