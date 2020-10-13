// action creators for building a burger
// synchronous add and remove

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT
        ,ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT
        ,ingredientName: name
    }
};

//error for initIngredients 
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// synchronus actioin creator for inside initIngredietns
export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS
        ,ingredients: ingredients
    }
}

export const initIngredients = () => {
    // fetch default ingredients from firebase db
    return{
        type: actionTypes.INIT_INGREDIENTS
    }
};