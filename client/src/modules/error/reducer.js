import { getActionName } from "../../utils/redux"
import { Map } from 'immutable'

const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    const actionName = getActionName(action.type)
    if (action.error) {
        return state.set(actionName, typeof action.payload === 'string' ? { error: action.payload } : action.payload)
    }

    return state.delete(actionName)
}