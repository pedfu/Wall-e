import { defineAction } from "../../utils/redux"

export const LOGIN = defineAction('LOGIN')
export const LOGOUT = defineAction('LOGOUT')

// not a dispatch because you should login via useAuthentication
export const login = ( key, user ) => ({ type: LOGIN, payload: { key, user } })

export const logout = () => ({ type: LOGOUT })
