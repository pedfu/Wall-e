import { combineReducers } from "redux";
import authentication from './authentication/reducer'
import loading from './loading/reducer'
import error from './error/reducer'

const combinedReducers = combineReducers({
    authentication,
    loading,
    error,
})

export default combinedReducers