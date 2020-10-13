// one central actions file to call from 

export {
    addIngredient,
    removeIngredient,
    initIngredients,
    setIngredients,
    fetchIngredientsFailed,
} from './burgerBuilder';

export {
    purchaseBurger,
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    purchaseBurgerFail,
    purchaseInit,
    fetchOrders,
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFail,
} from './order';

export {
    auth,
    authStart,
    authSuccess,
    authFail,
    authCheckState,
    checkAuthTimeout,
    logout,
    logoutSucceed,
    setAuthRedirectPath,
} from './auth';