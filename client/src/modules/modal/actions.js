import { defineAction } from "../../utils/redux";

export const OPEN_MODAL = defineAction('OPEN_MODAL')
export const CLOSE_MODAL = defineAction('CLOSE_MODAL')

export const openModal = (body) => (dispatch) => dispatch({
    type: OPEN_MODAL.ACTION,
    payload: body
})

export const closeModal = () => (dispatch) => dispatch({
    type: CLOSE_MODAL.ACTION,
    payload: null
})