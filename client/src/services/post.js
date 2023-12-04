import { get, post } from "./request";

export const generateImageRequest = (prompt) => post('/post', {}, prompt)

export const publicImageRequest = (id, body) => post(`/post/${id}/create-post`, {}, body)

export const likeImageRequest = (id, body) => post(`/post/${id}/like`, {}, body)

export const commentOnImageRequest = (id, body) => post(`/post/${id}/comment`, {}, body)

export const getCommentsFromImageRequest = (id) => get(`/post/${id}/comments`, {})

export const getImageRequest = (id) => get(`/post/${id}`, {}, null)

export const getAllImageRequest = () => get(`/post`, {}, null)

export const getLikedPostsRequest = () => get(`/post/liked`, {}, null)