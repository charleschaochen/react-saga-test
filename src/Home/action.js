import {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL} from './constants'

export const startFetch = (oParams) => ({
    type: FETCH_REQUEST,
    param: oParams
})