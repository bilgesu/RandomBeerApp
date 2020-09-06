import {call, put, takeEvery, select} from 'redux-saga/effects';

import {GET_BEER_DETAILS_REQUEST, GET_BREWERY_DETAILS_REQUEST, KEY, PRE_REQUEST_URL, REQUEST_URL} from '../constants';
import request from "../../utils/request";
import {selectBreweryId} from "../selector";
import {
    getBeerDetailsFailure,
    getBeerDetailsSuccess,
    getBreweryDetailsFailure,
    getBreweryDetailsSuccess
} from "../action/action";

export function* getBeerDetailsSaga() {
    // The hasLabels is used but the response doesn't include label
    // If the label doesn't exist, default image is shown with the given default image url
    const requestURL = PRE_REQUEST_URL + REQUEST_URL + `beer/random?key=${KEY}&withBreweries=Y&hasLabels=Y`;
    try {
        const repos = yield call(request, requestURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (repos.status === 'success') {
            // If beer has not any brewery the request is recalled until the beer has a brewery
            if(repos.data.breweries && repos.data.breweries.length > 0){
                yield put(getBeerDetailsSuccess(repos));
            } else {
                yield call(getBeerDetailsSaga);
            }
        } else {
            // If the request status is not success, the error is assigned to the error state
            yield put(getBeerDetailsFailure(repos.errorMessage));
        }
    } catch (err) {
        // If there is an error, the message is assigned to the error state
        yield put(getBeerDetailsFailure('There is something wrong'));
    }
}

export function* getBreweryDetailsSaga() {
    // The withLocations attribute is used for get the exact locations
    // The latitude and the longitude are used in MapComponent
    const breweryId = yield select(selectBreweryId());
    try {
        const requestURL = PRE_REQUEST_URL + REQUEST_URL + `/brewery/${breweryId}?key=${KEY}&withLocations=Y`;
        const repos = yield call(request, requestURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (repos.status === 'success') {
            yield put(getBreweryDetailsSuccess(repos));
        } else {
            // If the request status is not success, the error is assigned to the error state
            yield put(getBreweryDetailsFailure(repos.errorMessage));
        }
    } catch (err) {
        // If there is an error, the error is assigned to the error state
        yield put(getBreweryDetailsFailure('There is something wrong'));
    }
}

export default function* saga() {
    yield takeEvery(GET_BEER_DETAILS_REQUEST, getBeerDetailsSaga);
    yield takeEvery(GET_BREWERY_DETAILS_REQUEST, getBreweryDetailsSaga);
}