/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import saga from "./store/sagas/saga";


const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];
    const store = createStore(
        createReducer(),
        fromJS(initialState),
        compose(...enhancers)
    );

    // Extensions
    store.runSaga = sagaMiddleware.run(saga);
    return store;
}