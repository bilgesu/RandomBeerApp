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
        payload: { id, loading: true },
    };
}
export function getBeerDetailsSuccess(res) {
    return {
        type: GET_BEER_DETAILS_SUCCESS,
        payload: { data: res.data, loading: false },
    };
}
export function getBeerDetailsFailure(error) {
    return {
        type: GET_BEER_DETAILS_FAILURE,
        payload: { loading: false, error },
    };
}
export function getBreweryDetails() {
    return {
        type: GET_BREWERY_DETAILS_REQUEST,
        payload: { loading: true },
    };
}
export function getBreweryDetailsSuccess(res) {
    return {
        type: GET_BREWERY_DETAILS_SUCCESS,
        payload: { data: res.data, loading: false },
    };
}
export function getBreweryDetailsFailure(error) {
    return {
        type: GET_BREWERY_DETAILS_FAILURE,
        payload: { loading: false, error },
    };
}