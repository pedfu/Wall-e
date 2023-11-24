import { createReducer } from "../../utils/redux";
import { OPEN_TOOLTIP } from "./actions";

const INITIAL_STATE = {
    show: false,
    message: '',
    type: 'success'
}

export default createReducer(INITIAL_STATE, {
    [OPEN_TOOLTIP]: (state, action) => {
        return { ...state, ...action.payload, show: true }
    },
})