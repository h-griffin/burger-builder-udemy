//react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
//redux
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//redux-saga
import createSagaMiddleware from 'redux-saga';
//app
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas/index';


// redux store only available in dev not production/deployed
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    // slices of state
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware) //async code in action creators
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// sagaMiddleware.run(logoutSaga); //always calling
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
