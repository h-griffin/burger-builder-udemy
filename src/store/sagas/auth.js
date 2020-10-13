
import * as actionTypes from '../actions/actionTypes';


import { put } from 'redux-saga/effects'; //dispatch
// sagas like actions

//generator = function* executed incramentally does not run start to finihs, can pause
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put({ // action
        type: actionTypes.AUTH_LOGOUT
    })
}
