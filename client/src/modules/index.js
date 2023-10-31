import { combineReducers } from "redux";
import authentication from './authentication/reducer'
import loading from './loading/reducer'

const combinedReducers = combineReducers({
    authentication,
    loading,
})

export default combinedReducers