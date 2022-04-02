import buildQueryString from './buildQueryString';

const getHeaders = (extra = {}) => {
    const isBrowser = typeof window !== 'undefined';
    const headers = isBrowser ? new Headers() : {};

    Object.keys(extra).forEach(key => {
        if (isBrowser) {
            headers.append(key, extra[key]);
        } else {
            headers[key] = extra[key];
        }
    });

    return headers;
};

/**
 * @typedef {Object} FetchOptions
 * @property {('GET'|'POST'|'PUT'|'DELETE')} method
 * @property {String} path Relative path
 * @property {Object} data Request body / query options
 * @property {String} baseUrl Base URL. Defaults to `REACT_APP_GREBBCOMMERCE_API_URL`
 *
 * @param {FetchOptions}
 */
const request = ({ method, path, data, options = {}, baseUrl = process.env.REACT_APP_GREBBCOMMERCE_API_URL }) => {
    let url = baseUrl + path;
    /**
     * {RequestInit}
     */
    const fetchOpts = {
        method,
    };

    if (method === 'GET') {
        fetchOpts.headers = getHeaders({
            ...options,
        });
        if (data) {
            const prefix = url.indexOf('?') > -1 ? '&' : '?';
            const queryString = buildQueryString(data);

            url += prefix + queryString;
        }
    } else {
        fetchOpts.headers = getHeaders({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            ...options,
        });
        fetchOpts.body = buildQueryString(data);
    }

    return fetch(url, fetchOpts)
        .then(response => response.json())
        .catch(err => {
            console.error(`Unable to fetch and parse as JSON from '${url}'`, {
                method,
                baseUrl,
                path,
                data,
                fetchOpts,
            });

            throw err;
        });
};

export const get = (path, data, baseUrl, options) =>
    request({
        method: 'GET',
        path,
        data,
        baseUrl,
        options,
    });

export const post = (path, data, baseUrl, options) =>
    request({
        method: 'POST',
        path,
        data,
        baseUrl,
        options,
    });

export const put = (path, data, baseUrl, options) =>
    request({
        method: 'PUT',
        data,
        baseUrl,
        path,
        options,
    });

export const del = (path, data, baseUrl, options) =>
    request({
        method: 'DELETE',
        data,
        baseUrl,
        path,
        options,
    });
