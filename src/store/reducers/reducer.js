import { Record } from 'immutable';
import {
    GET_BEER_DETAILS_FAILURE,
    GET_BEER_DETAILS_REQUEST,
    GET_BEER_DETAILS_SUCCESS,
    GET_BREWERY_DETAILS_FAILURE,
    GET_BREWERY_DETAILS_REQUEST,
    GET_BREWERY_DETAILS_SUCCESS,
    ON_CHANGE_FIELD,
} from "../constants";
const InitialState = Record({
    randomBeerDetails: null,
    isLoading: false,
    breweryId: null,
    breweryDetails: null,
    error: {hasError: false, errorMessage: ''}
});
const reducer = (state = new InitialState(), action) => {
    switch (action.type) {
        case ON_CHANGE_FIELD: {
            console.log('reducer',action.payload.field,action.payload.value );
            const nextState = state.setIn([action.payload.field], action.payload.value);
            return nextState;
        }
        case GET_BEER_DETAILS_FAILURE: {
            const nextState = state.setIn(['isLoading'], action.payload.loading)
                .setIn(['error'], {hasError: true, errorMessage: action.payload.error});
            return nextState;
        }
        case GET_BEER_DETAILS_REQUEST: {
            const nextState = state.setIn(['isLoading'], action.payload.loading);
            return nextState;
        }
        case GET_BEER_DETAILS_SUCCESS: {
            const nextState = state.setIn(['isLoading'], action.payload.loading)
                .setIn(['randomBeerDetails'], action.payload.data)
                .setIn(['breweryId'], action.payload.data.breweries[0].id);
            return nextState;
        }
        case GET_BREWERY_DETAILS_FAILURE: {
            const nextState = state.setIn(['isLoading'], action.payload.loading)
                .setIn(['error'], {hasError: true, errorMessage: action.payload.error});
            return nextState;
        }
        case GET_BREWERY_DETAILS_REQUEST: {
            const nextState = state.setIn(['isLoading'], action.payload.loading);
            return nextState;
        }
        case GET_BREWERY_DETAILS_SUCCESS: {
            const nextState = state.setIn(['isLoading'], action.payload.loading)
                .setIn(['breweryDetails'], action.payload.data);
            return nextState;
        }
        default: {
            return state;
        }
    }
};

export default reducer;