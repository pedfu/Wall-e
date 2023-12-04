import { createReducer } from "../../utils/redux";
import { OPEN_MODAL, CLOSE_MODAL } from "./actions";

const INITIAL_STATE = {
    show: false,
    title: null,
    description: null,
    onConfirm: null,
}

export default createReducer(INITIAL_STATE, {
    [OPEN_MODAL]: (state, action) => {
        return { ...state, ...action.payload, show: true }
    },
    [CLOSE_MODAL]: (state, action) => {
        return { ...state, show: false }
    },
})