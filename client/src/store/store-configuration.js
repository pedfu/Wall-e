import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reducers from '../modules'

const environment = import.meta.env.VITE_ENVIRONMENT
// const environment = 'development'

const createStore = (initialState) => {
    if (environment === 'development') {
        return configureStore(reducers, initialState, composeWithDevTools(applyMiddleware([thunk, promise, logger])))
    }

    return configureStore(reducers, initialState, applyMiddleware([thunk, promise]))
}

export default createStore