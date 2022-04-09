/**
 * Get http query parameter from the url
 * @param {object} location - The redux location object
 * @returns {object} - A object with the parameter as key and its value as value
 */
export default location => {
    const params = {};
    location.search
        .substr(1)
        .split('&')
        .forEach(p => {
            const array = p.split('=');
            if (array[1]) {
                params[array[0]] = array[1];
            }
        });
    return params;
};
