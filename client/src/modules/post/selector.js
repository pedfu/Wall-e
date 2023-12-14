import { GENERATE_NEW_IMAGE, GET_ALL_IMAGES, GET_LIKED_IMAGES, GET_IMAGE_DETAILS, GET_USER_IMAGES } from "./actions"

export const allImagesSelector = ({ post }) => post.allImages
export const userImagesSelector = ({ post }) => post.userImages
export const likedImagesSelector = ({ post }) => post.likedImages
export const newImageSelector = ({ post }) => post.newImage
export const imageDetailsSelector = ({ post }) => post.imageDetails

export const loadingImageDetailsSelector = ({ loading }) => !!loading.get(GET_IMAGE_DETAILS.ACTION)
export const errorImageDetailsSelector = ({ error }) => error.get(GET_IMAGE_DETAILS.ACTION)

export const loadingAllImageSelector = ({ loading }) => !!loading.get(GET_ALL_IMAGES.ACTION)
export const errorAllImageSelector = ({ error }) => error.get(GET_ALL_IMAGES.ACTION)

export const loadingUserImagesSelector = ({ loading }) => !!loading.get(GET_USER_IMAGES.ACTION)
export const errorUserImagesSelector = ({ error }) => error.get(GET_USER_IMAGES.ACTION)

export const loadingLikedImagesSelector = ({ loading }) => !!loading.get(GET_LIKED_IMAGES.ACTION)
export const errorLikedImagesSelector = ({ error }) => error.get(GET_LIKED_IMAGES.ACTION)

export const loadingGenerateImageSelector = ({ loading }) => !!loading.get(GENERATE_NEW_IMAGE.ACTION)
export const errorGenerateImageSelector = ({ error }) => error.get(GENERATE_NEW_IMAGE.ACTION)