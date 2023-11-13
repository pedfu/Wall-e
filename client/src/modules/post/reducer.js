import { createReducer } from "../../utils/redux";
import { COMMENT_ON_IMAGE, GENERATE_IMAGE, GET_ALL_IMAGES, GET_COMMENTS, GET_IMAGE, LIKE_IMAGE, PUBLIC_IMAGE, GET_POST_DETAILS, CHANGE_LIKE_POST } from "./actions";

const INITIAL_STATE = {
    posts: [],
    post: {},
    newPost: {},
    postDetails: {},
}

export default createReducer(INITIAL_STATE, {
    [GENERATE_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = [...state.posts, action.payload.data]
        return { ...state, newPost: action.payload.data, posts : newPosts }
    },
    [PUBLIC_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload.data._id) return action.payload.data
            else return x
        })
        return { ...state, posts: newPosts }
    },
    [LIKE_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload.data._id) return action.payload.data
            else return x
        })
        return { ...state, posts: newPosts }
    },
    [COMMENT_ON_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload.data._id) return action.payload.data
            else return x
        })
        return { ...state, posts: newPosts, postDetails: action.payload.data }
    },
    [GET_COMMENTS.FULFILLED]: (state, action) => {
        const newPost = state.post
        newPost.comments = action.payload.data
        return { ...state, post: newPost }
    },
    [GET_IMAGE.FULFILLED]: (state, action) => {
        const newPosts = state.posts?.map(x => {
            if (x._id === action.payload.data._id) return action.payload.data
            else return x
        })
        return { ...state, posts: newPosts, post: action.payload.data }
    },
    [GET_POST_DETAILS.FULFILLED]: (state, action) => {
        return { ...state, postDetails: action.payload.data }
    },
    [GET_ALL_IMAGES.FULFILLED]: (state, action) => {
        return { ...state, posts: action.payload.data }
    },
    [CHANGE_LIKE_POST.FULFILLED]: (state, action) => {
        return { ...state, postDetails: action.payload.data }
    }
})