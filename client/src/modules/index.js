import { combineReducers } from "redux";
import authentication from './authentication/reducer'
import loading from './loading/reducer'
import error from './error/reducer'
import post from './post/reducer'
import tooltip from './tooltip/reducer'

const combinedReducers = combineReducers({
    authentication,
    loading,
    error,
    post,
    tooltip
})

export default combinedReducers