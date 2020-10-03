// action creators for submitting orders

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//                                      from db
export const purchaseBurgerSuccess = (id, orderData) => {   //sync
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};


export const purchaseBurgerFail = (error) => {  //sync
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => { // async / onlick order now
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData) //!! .json for firebase !! 
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            })
    };
};

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}