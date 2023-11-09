import { post } from "./request";

export const loginRequest = credentials => post('/auth/login', {}, credentials)

export const signupRequest = credentials => post('/auth/register', {}, credentials)
