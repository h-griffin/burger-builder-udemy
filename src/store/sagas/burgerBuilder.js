import { put } from 'redux-saga/effects'; //dispatch

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* initIngredientsSaga(action){
        try{
            const response = yield axios.get('https://burger-builder-react-88892.firebaseio.com/ingredients.json')
            yield put(actions.setIngredients(response.data));
        } catch (error){
            yield put(actions.fetchIngredientsFailed());
        }

}