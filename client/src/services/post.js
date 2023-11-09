import { get, post } from "./request";

export const generateImageRequest = (prompt) => post('/post', {}, prompt)

export const publicImageRequest = (id, body) => post(`/${id}/create-post`, {}, body)

export const likeImageRequest = (id, body) => post(`/${id}/like`, {}, body)

export const commentOnImageRequest = (id, body) => post(`/${id}/comment`, {}, body)

export const getCommentsFromImageRequest = (id) => get(`/${id}/comments`, {})

export const getImageRequest = (id) => get(`/${id}`, {})

export const getAllImageRequest = () => get(`/`, {})