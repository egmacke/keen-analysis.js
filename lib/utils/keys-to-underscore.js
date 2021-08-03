export function mapKeysToUnderscore(obj) {
    const exludedKeys = ['cache', 'index_by'];

    if (!obj || typeof obj !== 'object') return obj;

    const keys = Object.keys(obj) || [];
    const convertedObj = {};
    keys.forEach(key => {
        const value = obj[key];
        if ((key.match(new RegExp('[A-Z]')))) {
            key = key.replace(/[A-Z]/g, k => `_${k.toLowerCase()}`);
        }

        if (exludedKeys.includes(key)) {
            return convertedObj[key] = value;
        }

        if (Array.isArray(value)) {
            return convertedObj[key] = value.map(item => mapKeysToUnderscore(item));
        }

        if (typeof value === 'object') {
            return convertedObj[key] = mapKeysToUnderscore(value);
        }

        convertedObj[key] = value;
    });

    return convertedObj;
}