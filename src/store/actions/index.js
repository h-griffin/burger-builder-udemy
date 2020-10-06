// one central actions file to call from 

export {
    addIngredient,
    removeIngredient,
    initIngredients,
} from './burgerBuilder';

export {
    purchaseBurger,
    purchaseInit,
    fetchOrders,
} from './order';

export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState,
} from './auth';