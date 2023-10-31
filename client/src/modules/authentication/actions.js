import { defineAction } from "../../utils/redux"
import * as authenticationService from '../../services/authentication'

export const LOGIN = defineAction('LOGIN')
export const LOGOUT = defineAction('LOGOUT')

// not a dispatch because you should login via useAuthentication
export const login = ( credentials ) => (dispatch) => dispatch({
    type: LOGIN.ACTION,
    payload: authenticationService.loginRequest(credentials)
}) 

export const logout = () => ({ type: LOGOUT })
