import { post } from "./request";

export const loginRequest = credentials => post('/auth/login', {}, credentials)

export const signupRequest = credentials => post('/auth/register', {}, credentials)

// { email }
export const forgotPasswordRequest = credentials => post('/auth/forgot-password', {}, credentials)

// { email, code }
export const confirmCodeRequest = credentials => post('/auth/confirm-code', {}, credentials)

// { newPassword, confirmationPassword } + emailToken
export const updatePasswordRequest = credentials => post('/auth/update-password', {}, credentials)
