import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); //miliseconds into full second
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        // ... authenticate
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        //sign up
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNjPD57g6p4mYq0nsiOKFZBtK99xt-cUM'
        if(isSignup){
            //sign in
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNjPD57g6p4mYq0nsiOKFZBtK99xt-cUM'
        }
        axios.post(url, authData)
            .then( response => {
                // console.log('auth succ', response.data);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000) //miliseconds to full 

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log('auth err', err);
                dispatch(authFail(err.response.data.error));
            })
    }
}


export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheckState = () => { //pure utility func
    return dispatch => {
        // not async but needs multiple actions
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()){
                dispatch(logout())
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds())) //diff future date from current date/expiration
            }
        }
    }
}