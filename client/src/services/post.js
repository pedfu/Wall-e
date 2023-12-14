import { get, post } from "./request";

export const likeImageRequest = (id, body) => post(`/post/${id}/like`, {}, body)

export const commentOnImageRequest = (id, body) => post(`/post/${id}/comment`, {}, body)

export const getUserImagesRequest = (nextPage, pageSize) => get(`/post/my-posts?page=${nextPage}&pageSize=${pageSize}`, {}, null)

export const getImageRequest = (id) => get(`/post/${id}`, {}, null)

export const getAllImageRequest = (nextPage, pageSize) => get(`/post?page=${nextPage}&pageSize=${pageSize}`, {}, null)

export const getLikedImagesRequest = () => get(`/post/liked`, {}, null)

// { prompt: '' }
export const generateNewImage = (body) => post('/post/add-image', {}, body)

export const checkNewImageStatus = (id) => get(`/post/${id}/check-status`, {}, null)