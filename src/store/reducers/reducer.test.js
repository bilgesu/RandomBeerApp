import reducer from "./reducer";
import {Record} from "immutable";

const GET_BEER_DETAILS_FAILURE_STATE = Record({
    isLoading: true,
    error: {}
});
test('should handle GET_BEER_DETAILS_FAILURE', () => {
        expect(
            reducer(new GET_BEER_DETAILS_FAILURE_STATE(), {
                type: "GET_BEER_DETAILS_FAILURE",
                payload: {isLoading: false, error: {hasError: true, errorMessage: 'testJest'}}
            })
        ).toEqual(new GET_BEER_DETAILS_FAILURE_STATE(
            {
                isLoading: false,
                error: {hasError: true, errorMessage: 'testJest'}

            })
        )
    },
);

const GET_BEER_DETAILS_SUCCESS_STATE = Record({
    isLoading: true,
    breweryId: '',
    randomBeerDetails: {},
});
test('should handle GET_BEER_DETAILS_SUCCESS', () => {
        expect(
            reducer(new GET_BEER_DETAILS_SUCCESS_STATE(), {
                type: "GET_BEER_DETAILS_SUCCESS",
                payload: {isLoading: false, randomBeerDetails: {name: 'test data'}, breweryId: '123'}
            })
        ).toEqual(new GET_BEER_DETAILS_SUCCESS_STATE(
            {
                isLoading: false,
                randomBeerDetails: {name: 'test data'},
                breweryId: '123',
            })
        )
    },
);

const GET_BEER_DETAILS_REQUEST_STATE = Record({
    isLoading: false,
});
test('should handle GET_BEER_DETAILS_REQUEST', () => {
        expect(
            reducer(new GET_BEER_DETAILS_REQUEST_STATE(), {
                type: "GET_BEER_DETAILS_REQUEST",
                payload: {isLoading: true}
            })
        ).toEqual(new GET_BEER_DETAILS_REQUEST_STATE(
            {
                isLoading: true,
            })
        )
    },
);

const GET_BREWERY_DETAILS_FAILURE_STATE = Record({
    isLoading: true,
    error: {}
});
test('should handle GET_BREWERY_DETAILS_FAILURE', () => {
        expect(
            reducer(new GET_BREWERY_DETAILS_FAILURE_STATE(), {
                type: "GET_BREWERY_DETAILS_FAILURE",
                payload: {isLoading: false, error: {hasError: true, errorMessage: 'testJest'}}
            })
        ).toEqual(new GET_BREWERY_DETAILS_FAILURE_STATE(
            {
                isLoading: false,
                error: {hasError: true, errorMessage: 'testJest'}

            })
        )
    },
);

const GET_BREWERY_DETAILS_SUCCESS_STATE = Record({
    isLoading: true,
    breweryDetails: {},
});
test('should handle GET_BREWERY_DETAILS_SUCCESS', () => {
        expect(
            reducer(new GET_BREWERY_DETAILS_SUCCESS_STATE(), {
                type: "GET_BREWERY_DETAILS_SUCCESS",
                payload: {isLoading: false, breweryDetails: {name: 'brewery details test', id: 0}}
            })
        ).toEqual(new GET_BREWERY_DETAILS_SUCCESS_STATE(
            {
                isLoading: false,
                breweryDetails: {name: 'brewery details test', id: 0},
            })
        )
    },
);

const GET_BREWERY_DETAILS_REQUEST_STATE = Record({
    isLoading: false,
});
test('should handle GET_BREWERY_DETAILS_REQUEST', () => {
        expect(
            reducer(new GET_BREWERY_DETAILS_REQUEST_STATE(), {
                type: "GET_BREWERY_DETAILS_REQUEST",
                payload: {isLoading: true}
            })
        ).toEqual(new GET_BREWERY_DETAILS_REQUEST_STATE(
            {
                isLoading: true,
            })
        )
    },
);