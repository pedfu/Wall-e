import { defineAction } from "../../utils/redux"
import * as authenticationService from '../../services/authentication'

export const LOGIN = defineAction('LOGIN')
export const LOGOUT = defineAction('LOGOUT')
export const SIGN_UP = defineAction('SIGN_UP')

// not a dispatch because you should login via useAuthentication
export const login = (credentials) => (dispatch) => dispatch({
    type: LOGIN.ACTION,
    payload: authenticationService.loginRequest(credentials)
}) 

export const logout = () => (dispatch) => dispatch({ 
    type: LOGOUT 
})

export const signup = (creadentials) => (dispatch) => dispatch({
    type: SIGN_UP.ACTION,
    payload: authenticationService.signupRequest(creadentials)
})
