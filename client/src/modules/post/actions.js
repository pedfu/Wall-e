import { defineAction } from "../../utils/redux";
import * as postServices from '../../services/post'

export const PUBLIC_IMAGE = defineAction('PUBLIC_IMAGE')
export const LIKE_IMAGE = defineAction('LIKE_IMAGE')
export const COMMENT_ON_IMAGE = defineAction('COMMENT_ON_IMAGE')
export const GET_ALL_IMAGES = defineAction('GET_ALL_IMAGES')
export const GET_IMAGE_DETAILS = defineAction('GET_IMAGE_DETAILS')
export const GET_LIKED_IMAGES = defineAction('GET_LIKED_IMAGES')
export const CHANGE_LIKE_IMAGE = defineAction('CHANGE_LIKE_IMAGE')
export const GENERATE_NEW_IMAGE = defineAction('GENERATE_NEW_IMAGE')
export const CHECK_IMAGE_STATUS = defineAction('CHECK_IMAGE_STATUS')
export const GET_USER_IMAGES = defineAction('GET_USER_IMAGES')

export const publicImage = (id, body) => (dispatch) => dispatch({
    type: PUBLIC_IMAGE.ACTION,
    payload: postServices.publicImageRequest(id, body)
})

export const likeImage = (id, body) => (dispatch) => dispatch({
    type: LIKE_IMAGE.ACTION,
    payload: postServices.likeImageRequest(id, body)
})

export const commentOnImage = (id, body) => (dispatch) => dispatch({
    type: COMMENT_ON_IMAGE.ACTION,
    payload: postServices.commentOnImageRequest(id, body)
})

export const getImageDetails = (id) => (dispatch) => dispatch({
    type: GET_IMAGE_DETAILS.ACTION,
    payload: postServices.getImageRequest(id)
})

export const getUserImages = (nextPage, pageSize) => (dispatch) => dispatch({
    type: GET_USER_IMAGES.ACTION,
    payload: postServices.getUserImagesRequest(nextPage || 1, pageSize || 20)
})

export const getAllImages = (nextPage, pageSize) => (dispatch) => dispatch({
    type: GET_ALL_IMAGES.ACTION,
    payload: postServices.getAllImageRequest(nextPage || 1, pageSize || 20)
})

export const getLikedImages = () => (dispatch) => dispatch({
    type: GET_LIKED_IMAGES.ACTION,
    payload: postServices.getLikedImagesRequest()
})

export const generateNewImage = (body) => (dispatch) => dispatch({
    type: GENERATE_NEW_IMAGE.ACTION,
    payload: postServices.generateNewImage(body)
})

export const checkImageStatus = (id) => (dispatch) => dispatch({
    type: CHECK_IMAGE_STATUS.ACTION,
    paylaod: postServices.checkNewImageStatus(id)
})