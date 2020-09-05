import {createSelector} from 'reselect';

const selectFields = (state) => state.get('beer');

const selectBeerDetails = () => createSelector(
    selectFields,
    (state) => state.get('randomBeerDetails'),
);

const selectBreweryId = () => createSelector(
    selectFields,
    (state) => state.get('breweryId'),
);

const selectBreweryDetails = () => createSelector(
    selectFields,
    (state) => state.get('breweryDetails'),
);
const selectIsLoading = () => createSelector(
    selectFields,
    (state) => state.get('isLoading'),
);
const selectError = () => createSelector(
    selectFields,
    (state) => state.get('error'),
);

export {
    selectBeerDetails,
    selectBreweryDetails,
    selectIsLoading,
    selectBreweryId,
    selectError,
}