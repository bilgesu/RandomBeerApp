import {
    GET_BEER_DETAILS_FAILURE,
    GET_BEER_DETAILS_REQUEST,
    GET_BEER_DETAILS_SUCCESS,
    GET_BREWERY_DETAILS_FAILURE,
    GET_BREWERY_DETAILS_REQUEST,
    GET_BREWERY_DETAILS_SUCCESS, ON_CHANGE_FIELD
} from "../constants";

export function onChangeField(field, value) {
    return {
        type: ON_CHANGE_FIELD,
        payload: { field, value },
    };
}

export function getBeerDetails(id) {
    return {
        type: GET_BEER_DETAILS_REQUEST,
        payload: { id, isLoading: true },
    };
}
export function getBeerDetailsSuccess(res) {
    return {
        type: GET_BEER_DETAILS_SUCCESS,
        payload: { isLoading: false, randomBeerDetails: res.data, breweryId: res.data.breweries[0].id },
    };
}
export function getBeerDetailsFailure(error) {
    return {
        type: GET_BEER_DETAILS_FAILURE,
        payload: { isLoading: false, error: {hasError: true, errorMessage: error} },
    };
}
export function getBreweryDetails() {
    return {
        type: GET_BREWERY_DETAILS_REQUEST,
        payload: { isLoading: true },
    };
}
export function getBreweryDetailsSuccess(res) {
    return {
        type: GET_BREWERY_DETAILS_SUCCESS,
        payload: { breweryDetails: res.data, isLoading: false },
    };
}
export function getBreweryDetailsFailure(error) {
    return {
        type: GET_BREWERY_DETAILS_FAILURE,
        payload: { isLoading: false, error: {hasError: true, errorMessage: error} },
    };
}