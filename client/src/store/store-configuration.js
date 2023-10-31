import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reducers from '../modules'

const environment = import.meta.env.VITE_ENVIRONMENT

const createStore = (initialState) => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk, promise, logger]),
        devTools: environment === 'development',
        preloadedState: initialState,
    })
}

export default createStore