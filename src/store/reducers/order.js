import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders: [],
    loading: false, // ordering / true when ordering/purchasing
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch ( action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false,
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {  //id and data come in seperate, this combinds them to be added into orders
                ...action.orderData,
                id: action.orderId,
                purchased: true,
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder) //concat new arr with old arr // immutable/safe
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false, //even if fail, still done

            }
        default:
            return state;
    }
}

export default reducer;