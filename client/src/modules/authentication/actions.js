import { defineAction } from "../../utils/redux"
import * as authenticationService from '../../services/authentication'

export const LOGIN = defineAction('LOGIN')
export const LOGOUT = defineAction('LOGOUT')
export const SIGN_UP = defineAction('SIGN_UP')
export const FORGOT_PASSWORD = defineAction('FORGOT_PASSWORD')
export const CONFIRM_CODE = defineAction('CONFIRM_CODE')
export const UPDATE_PASSWORD = defineAction('UPDATE_PASSWORD')

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

export const forgotPassword = (creadentials) => (dispatch) => dispatch({
    type: FORGOT_PASSWORD.ACTION,
    payload: authenticationService.forgotPasswordRequest(creadentials)
})

export const confirmCode = (creadentials) => (dispatch) => dispatch({
    type: CONFIRM_CODE.ACTION,
    payload: authenticationService.confirmCodeRequest(creadentials)
})

export const updatePassword = (creadentials) => (dispatch) => dispatch({
    type: UPDATE_PASSWORD.ACTION,
    payload: authenticationService.updatePasswordRequest(creadentials)
})
