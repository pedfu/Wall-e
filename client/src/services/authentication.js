import { post } from "./request";

const loginRequest = credentials => post('/login', {}, credentials)