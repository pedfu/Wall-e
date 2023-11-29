import { defineAction } from "../../utils/redux";

export const OPEN_TOOLTIP = defineAction('OPEN_TOOLTIP')

export const openTooltip = (body) => (dispatch) => dispatch({
    type: OPEN_TOOLTIP.ACTION,
    payload: body
})