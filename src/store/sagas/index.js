import { all, takeEvery, takeLatest } from 'redux-saga/effects';


import * as actionTypes from '../actions/actionTypes';
import { 
    logoutSaga
    ,checkAuthTimeoutSaga
    ,authUserSaga
    ,authCheckStateSaga 
} from './auth';

import { initIngredientsSaga } from './burgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';



//watchers
export function* watchAuth(){
    //listents to initiate and executes
    yield all( [
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
        ,takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
        ,takeEvery(actionTypes.AUTH_USER, authUserSaga)
        ,takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])

    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga); //spam button
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}