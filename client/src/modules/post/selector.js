import { GENERATE_IMAGE, GENERATE_NEW_IMAGE, GET_ALL_IMAGES, GET_COMMENTS, GET_IMAGE, GET_LIKED_POSTS, GET_POST_DETAILS } from "./actions"

export const allPostSelector = ({ post }) => post.posts
export const likedPostsSelector = ({ post }) => post.likedPosts
export const postSelector = ({ post }) => post.post
export const newPostSelector = ({ post }) => post.newPost
export const postDetailsSelector = ({ post }) => post.postDetails

export const loadingPostDetailsSelector = ({ loading }) => !!loading.get(GET_POST_DETAILS.ACTION)
export const errorPostDetailsSelector = ({ error }) => error.get(GET_POST_DETAILS.ACTION)

export const loadingAllPostSelector = ({ loading }) => !!loading.get(GET_ALL_IMAGES.ACTION)
export const errorAllPostSelector = ({ error }) => error.get(GET_ALL_IMAGES.ACTION)

export const loadingLikedPostsSelector = ({ loading }) => !!loading.get(GET_LIKED_POSTS.ACTION)
export const errorLikedPostsSelector = ({ error }) => error.get(GET_LIKED_POSTS.ACTION)

export const loadingGeneratePostSelector = ({ loading }) => !!loading.get(GENERATE_IMAGE.ACTION) || !!loading.get(GENERATE_NEW_IMAGE.ACTION)
export const errorGeneratePostSelector = ({ error }) => error.get(GENERATE_IMAGE.ACTION) || error.get(GENERATE_NEW_IMAGE.ACTION)

export const loadingPostSelector = ({ loading }) => !!loading.get(GET_IMAGE.ACTION) || !!loading.get(GET_COMMENTS.ACTION)
export const errorPostSelector = ({ error }) => error.get(GET_IMAGE.ACTION) || !!error.get(GET_COMMENTS.ACTION)