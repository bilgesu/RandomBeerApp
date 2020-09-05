
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
        if (contentType.indexOf('application/json') !== -1) {
            return response.json();
        }
        return response.text();
    }
    return response;
}
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(requestUrl, options = { disableEncoding: true }) {
    let url = requestUrl;
    if (!options.disableEncoding) {
        url = encodeURI(url);
    }
    return fetch(url, options)
        .then(parseJSON);
}