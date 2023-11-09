import { GENERATE_IMAGE, GET_ALL_IMAGES, GET_COMMENTS, GET_IMAGE } from "./actions"

export const allPostSelector = ({ post }) => post.posts
export const postSelector = ({ post }) => post.post
export const newPostSelector = ({ post }) => post.newPost

export const loadingAllPostSelector = ({ loading }) => !!loading.get(GET_ALL_IMAGES.ACTION)
export const errorAllPostSelector = ({ error }) => error.get(GET_ALL_IMAGES.ACTION)

export const loadingGeneratePostSelector = ({ loading }) => !!loading.get(GENERATE_IMAGE.ACTION)
export const errorGeneratePostSelector = ({ error }) => error.get(GENERATE_IMAGE.ACTION)

export const loadingPostSelector = ({ loading }) => !!loading.get(GET_IMAGE.ACTION) || !!loading.get(GET_COMMENTS.ACTION)
export const errorPostSelector = ({ error }) => error.get(GET_IMAGE.ACTION) || !!error.get(GET_COMMENTS.ACTION)