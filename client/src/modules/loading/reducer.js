import { getActionName } from "../../utils/redux"
import { Map } from 'immutable'

const INITIAL_STATE = Map()

const isPending = actionType => actionType.toString().includes('PENDING')

const isCompleted = actionType => actionType.toString().includes('FULFILLED') || actionType.toString().includes('REJECTED')

export default (state = INITIAL_STATE, action) => {
    const actionName = getActionName(action.type)
    const actionCount = `${actionName}_COUNT`
    const count = state.get(actionCount) || 0

    if (isPending(action.type)) {
        return state.set(actionCount, count + 1).set(actionName, count + 1 > 0)
    }
    if (isCompleted(action.type)) {
        return state.set(actionCount, count - 1).set(actionName, count - 1 > 0)
    }

    return state
}