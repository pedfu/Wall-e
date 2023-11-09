import { defineAction } from "../../utils/redux";
import * as postServices from '../../services/post'

export const GENERATE_IMAGE = defineAction('GENERATE_IMAGE')
export const PUBLIC_IMAGE = defineAction('PUBLIC_IMAGE')
export const LIKE_IMAGE = defineAction('LIKE_IMAGE')
export const COMMENT_ON_IMAGE = defineAction('COMMENT_ON_IMAGE')
export const GET_COMMENTS = defineAction('GET_COMMENTS')
export const GET_IMAGE = defineAction('GET_IMAGE')
export const GET_ALL_IMAGES = defineAction('GET_ALL_IMAGES')

export const generateImage = (body) => (dispatch) => dispatch({
    type: GENERATE_IMAGE.ACTION,
    payload: postServices.generateImageRequest(body)
})

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

export const getCommentsFromImage = (id) => (dispatch) => dispatch({
    type: GET_COMMENTS.ACTION,
    payload: postServices.getCommentsFromImageRequest(id)
})

export const getImage = (id) => (dispatch) => dispatch({
    type: GET_IMAGE.ACTION,
    payload: postServices.getImageRequest(id)
})

export const getAllImage = () => (dispatch) => dispatch({
    type: GET_ALL_IMAGES.ACTION,
    payload: postServices.getAllImageRequest()
})