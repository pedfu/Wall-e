import { createReducer } from "../../utils/redux";
import { COMMENT_ON_IMAGE, GET_ALL_IMAGES, LIKE_IMAGE, GET_IMAGE_DETAILS, CHANGE_LIKE_IMAGE, GET_LIKED_IMAGES, GENERATE_NEW_IMAGE, GET_USER_IMAGES } from "./actions";

const INITIAL_STATE = {
    newImage: {},
    imageDetails: {},
    allImages: {
        totalCount: 0,
        nextPage: 0,
        images: [],
    },
    likedImages: {
        totalCount: 0,
        nextPage: 0,
        images: [],
    },
    userImages: {
        totalCount: 0,
        nextPage: 0,
        images: [],
    }
}

export default createReducer(INITIAL_STATE, {
    [GENERATE_NEW_IMAGE.FULFILLED]: (state, action) => {
        const newImages = [action.payload.data, ...state.userImages.images]
        return { ...state, newImage: action.payload.data, userImages: { ...state.userImages, images: newImages }}
    },
    [LIKE_IMAGE.FULFILLED]: (state, action) => {
        const likedImage = action.payload.data;

        const allImagesIndex = state.allImages.images?.findIndex(x => x._id === likedImage._id);
        const updatedAllImages = [...state.allImages.images];
        if (allImagesIndex >= 0) updatedAllImages[allImagesIndex] = likedImage;

        const userImagesIndex = state.userImages.images?.findIndex(x => x._id === likedImage._id);
        const updatedUserImages = [...state.userImages.images];
        if (userImagesIndex >= 0) updatedUserImages[userImagesIndex] = likedImage;

        const updatedLikedImages = likedImage.liked
            ? [...state.likedImages.images, likedImage]
            : state.likedImages.images.filter(x => x._id !== likedImage._id);

        return {
            ...state,
            allImages: { ...state.allImages, images: updatedAllImages },
            userImages: { ...state.userImages, images: updatedUserImages },
            likedImages: { ...state.likedImages, images: updatedLikedImages },
            imageDetails: state.imageDetails._id === likedImage._id ? likedImage : state.imageDetails
        };
    },
    [COMMENT_ON_IMAGE.FULFILLED]: (state, action) => {
        return { ...state, imageDetails: action.payload.data }
    },
    [GET_IMAGE_DETAILS.FULFILLED]: (state, action) => {
        return { ...state, imageDetails: action.payload.data }
    },
    [GET_ALL_IMAGES.FULFILLED]: (state, action) => {
        const { totalCount, nextPage, posts } = action.payload.data
        return { ...state, allImages: { images: posts, totalCount, nextPage }};
    },
    [CHANGE_LIKE_IMAGE.FULFILLED]: (state, action) => {
        return { ...state, imageDetails: action.payload.data }
    },
    [GET_LIKED_IMAGES.FULFILLED]: (state, action) => {
        const { totalCount, nextPage, posts } = action.payload.data
        return { ...state, likedImages: { images: posts, totalCount, nextPage }};
    },
    [GET_USER_IMAGES.FULFILLED]: (state, action) => {
        const { totalCount, nextPage, posts } = action.payload.data        
        return { ...state, userImages: { images: posts, totalCount, nextPage }};
    }
})