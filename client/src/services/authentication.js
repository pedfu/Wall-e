import { post } from "./request";

export const loginRequest = credentials => post('/login', {}, credentials)
