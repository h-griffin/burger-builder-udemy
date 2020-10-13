// action creators for submitting orders

import * as actionTypes from './actionTypes';


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

export const purchaseBurger = (orderData, token) => { // async / onlick order now
    return{
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
};

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS
        ,orders: orders
    }
}

export const fetchOrdersFail = ( error ) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL
        ,error: error
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return{
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId,
    }
}