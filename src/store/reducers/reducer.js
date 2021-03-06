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
            const nextState = state.setIn([action.payload.field], action.payload.value);
            return nextState;
        }
        case GET_BEER_DETAILS_FAILURE: {
            const nextState = state.setIn(['isLoading'], action.payload.isLoading)
                .setIn(['error'], action.payload.error);
            return nextState;
        }
        case GET_BEER_DETAILS_REQUEST: {
            const nextState = state.setIn(['isLoading'], action.payload.isLoading);
            return nextState;
        }
        case GET_BEER_DETAILS_SUCCESS: {
            const nextState = state.setIn(['isLoading'], action.payload.isLoading)
                .setIn(['randomBeerDetails'], action.payload.randomBeerDetails)
                .setIn(['breweryId'], action.payload.breweryId);
            return nextState;
        }
        case GET_BREWERY_DETAILS_FAILURE: {
            const nextState = state.setIn(['isLoading'], action.payload.isLoading)
                .setIn(['error'], action.payload.error);
            return nextState;
        }
        case GET_BREWERY_DETAILS_REQUEST: {
            const nextState = state.setIn(['isLoading'], action.payload.isLoading);
            return nextState;
        }
        case GET_BREWERY_DETAILS_SUCCESS: {
            const nextState = state.setIn(['isLoading'], action.payload.isLoading)
                .setIn(['breweryDetails'], action.payload.breweryDetails);
            return nextState;
        }
        default: {
            return state;
        }
    }
};

export default reducer;