import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    // pure no side effects , does not need
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    // pure no side effects , does not need
    return {
        type: actionTypes.AUTH_SUCCESS
        ,idToken: token
        ,userId: userId
    };
};

export const authFail = (error) => {
    // pure no side effects , does not need
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};


export const logout = () => {
    //local storage removals
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    // was hard coded in auth saga return
    return { 
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    // side effects = async timer
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT
        ,expirationTime: expirationTime
    }
}

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER
        ,email: email
        ,password: password
        ,isSignup: isSignup
    }
}


export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheckState = () => { //pure utility func
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}