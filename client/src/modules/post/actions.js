import { defineAction } from "../../utils/redux";
import * as postServices from '../../services/post'

export const GENERATE_IMAGE = defineAction('GENERATE_IMAGE')
export const PUBLIC_IMAGE = defineAction('PUBLIC_IMAGE')
export const LIKE_IMAGE = defineAction('LIKE_IMAGE')
export const COMMENT_ON_IMAGE = defineAction('COMMENT_ON_IMAGE')
export const GET_COMMENTS = defineAction('GET_COMMENTS')
export const GET_IMAGE = defineAction('GET_IMAGE')
export const GET_ALL_IMAGES = defineAction('GET_ALL_IMAGES')
export const GET_POST_DETAILS = defineAction('GET_POST_DETAILS')
export const GET_LIKED_POSTS = defineAction('GET_LIKED_POSTS')
export const CHANGE_LIKE_POST = defineAction('CHANGE_LIKE_POST')
export const GENERATE_NEW_IMAGE = defineAction('GENERATE_NEW_IMAGE')
export const CHECK_IMAGE_STATUS = defineAction('CHECK_IMAGE_STATUS')

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

export const getPost = (id) => (dispatch) => dispatch({
    type: GET_IMAGE.ACTION,
    payload: postServices.getImageRequest(id)
})

export const getPostDetails = (id) => (dispatch) => dispatch({
    type: GET_POST_DETAILS.ACTION,
    payload: postServices.getImageRequest(id)
})

export const getAllPosts = () => (dispatch) => dispatch({
    type: GET_ALL_IMAGES.ACTION,
    payload: postServices.getAllImageRequest()
})

export const getLikedPosts = () => (dispatch) => dispatch({
    type: GET_LIKED_POSTS.ACTION,
    payload: postServices.getLikedPostsRequest()
})

export const likePost = (id, body) => (dispatch) => dispatch({
    type: CHANGE_LIKE_POST.ACTION,
    payload: postServices.likeImageRequest(id, body)
})

export const generateNewImage = (body) => (dispatch) => dispatch({
    type: GENERATE_NEW_IMAGE.ACTION,
    payload: postServices.generateNewImage(body)
})

export const checkImageStatus = (id) => (dispatch) => dispatch({
    type: CHECK_IMAGE_STATUS.ACTION,
    paylaod: postServices.checkNewImageStatus(id)
})