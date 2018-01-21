import {call, put, takeEvery} from 'redux-saga/effects'
import {FETCH_REQUEST, FETCH_SUCCESS} from './constants'

/**
 * worker saga
 * @param action
 */
export function* fetchData() {
    const action = arguments[0];
    const asyncFunc = (oParam) => {
        console.log('[Home] start async task, params: ' + JSON.stringify(oParam) + '.');
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                console.log('[Home] executed async task.')
                resolve({success: true});
            }, 1000 * 6)
        });
    }

    const result = yield call(asyncFunc, action.param)
    yield put({type: FETCH_SUCCESS, result})
}

/**
 * watcher saga
 */
export default function* watchFetchData() {
    console.log('[Home] watch fetch data task...')
    yield takeEvery(FETCH_REQUEST, fetchData)
    console.log('[Home] fetch data startesd.')
}