
import * as actions from '../actions/index';
import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects'; //dispatch
import axios from 'axios';


// sagas like actions

//generator = function* executed incramentally does not run start to finihs, can pause
export function* logoutSaga(action) {
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');

    yield call( [localStorage, 'removeItem'], 'token') //testable
    yield call( [localStorage, 'removeItem'], 'expirationDate')
    yield call( [localStorage, 'removeItem'], 'userId')

    yield put(actions.logoutSucceed()); //action
}


export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action){

        yield put(actions.authStart());
        const authData = {
            email: action.email
            ,password: action.password
            ,returnSecureToken: true
        };
        //sign up
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNjPD57g6p4mYq0nsiOKFZBtK99xt-cUM'
        if(!action.isSignup){
            //sign in
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNjPD57g6p4mYq0nsiOKFZBtK99xt-cUM'
        }

        try{
            const response = yield axios.post(url, authData)// will store results from promise in const
    
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000) //miliseconds to full 
    
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('userId', response.data.localId);
    
            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
        } catch (error){
            yield put(actions.authFail(error.response.data.error));
        }

}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if (!token){
        yield put(actions.logout());
    }else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()){
            yield put(actions.logout())
        }else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)) //diff future date from current date/expiration
        }
    }
}