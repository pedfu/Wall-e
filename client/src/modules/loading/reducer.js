import { getActionName } from "../../utils/redux"

const INITIAL_STATE = new Map()

const isPending = actionType => actionType.toString().includes('PENDING')

const isCompleted = actionType => actionType.toString().includes('FULFILLED') || actionType.toString().includes('REJECTED')

const reducer = (state = INITIAL_STATE, action) => {
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

export default reducer