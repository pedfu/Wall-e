import { defineAction as defineReduxAction } from 'redux-define'

// subactions
const REQUEST_STATUS = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

// create action with subactions
export const defineAction = type => defineReduxAction(type, REQUEST_STATUS)

// create reducer
export const createReducer = (initialState, handlers) => (state = initialState, action) => {
    const reduce = handlers[action.type]
    return reduce ? reduce(state, action) : state
}

// get action name without subactions
export const getActionName = name => name.toString().replace(/_PENDING$|_REJECTED$|_FULFILLED$|_COUNT$/, '')