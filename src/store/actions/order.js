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

export const purchaseBurger = (orderData, token) => { // async / onlick order now
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData) //!! .json for firebase !! 
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

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const fetchOrdersFail = ( error ) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        // axios.get('/orders.json')
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchedOrders =[];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],   // data/ingredients
                    id: key,            // firebase key/id
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}