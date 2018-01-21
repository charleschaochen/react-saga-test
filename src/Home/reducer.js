import {FETCH_SUCCESS, FETCH_FAIL} from './constants'
import {combineReducers} from 'redux'

const data = (state = {}, action) => {
    if (action.type == FETCH_SUCCESS) {
        state = action.result
    }
    return state
}

const error = (state = '', action) => {
    if (action.type == FETCH_FAIL) {
        state = action.error
    }
    return state
}

export default combineReducers({
    data,
    error
})