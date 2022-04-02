const buildQueryString = parameters => {
    const result = [];

    const expandProperties = (properties, previousName = '') => {
        if (properties instanceof Array) {
            properties.forEach((property, index) => {
                expandProperties(property, `${previousName}[${index}]`);
            });
        } else if (properties instanceof Object) {
            Object.keys(properties).forEach(key => {
                expandProperties(properties[key], `${previousName}[${key}]`);
            });
        } else {
            result.push(`${encodeURIComponent(previousName)}=${encodeURIComponent(properties)}`);
        }
    };

    Object.keys(parameters).forEach(key => {
        expandProperties(parameters[key], key);
    });

    return result.join('&');
};

export default buildQueryString;
