import { createReducer } from "../../utils/redux";
import { COMMENT_ON_IMAGE, GENERATE_IMAGE, GET_ALL_IMAGES, GET_COMMENTS, GET_IMAGE, LIKE_IMAGE, PUBLIC_IMAGE } from "./actions";

const INITIAL_STATE = {
    posts: [],
    post: {},
    newPost: {}
}

export default createReducer(INITIAL_STATE, {
    [GENERATE_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = [...state.posts, action.payload]
        return { ...state, newPost: action.payload, posts : newPosts }
    },
    [PUBLIC_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload._id) return action.payload
            else return x
        })
        return { ...state, posts: newPosts }
    },
    [LIKE_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload._id) return action.payload
            else return x
        })
        return { ...state, posts: newPosts }
    },
    [COMMENT_ON_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload._id) return action.payload
            else return x
        })
        return { ...state, posts: newPosts }
    },
    [GET_COMMENTS.FULFILLED]: (state, action) => {
        const newPost = state.post
        newPost.comments = action.payload
        return { ...state, post: newPost }
    },
    [GET_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload._id) return action.payload
            else return x
        })
        return { ...state, posts: newPosts, post: action.payload }
    },
    [GET_ALL_IMAGES.FULFILLED]: (state, action) => {
        return { ...state, posts: action.payload }
    }
})