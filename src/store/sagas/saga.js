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
            yield put(getBeerDetailsSuccess(repos));
        } else {
            yield put(getBeerDetailsFailure(repos.errorMessage));
        }
    } catch (err) {
        yield put(getBeerDetailsFailure(err));
    }
}

export function* getBreweryDetailsSaga() {
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
            yield put(getBreweryDetailsFailure(repos.errorMessage));
        }
    } catch (err) {
        const errorMessage = err.status + ' - ' + err.statusText;
        yield put(getBreweryDetailsFailure(errorMessage));
    }
}

export default function* saga() {
    yield takeEvery(GET_BEER_DETAILS_REQUEST, getBeerDetailsSaga);
    yield takeEvery(GET_BREWERY_DETAILS_REQUEST, getBreweryDetailsSaga);
}