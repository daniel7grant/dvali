import { Ignore, Success, ValidatorFunction } from '../../types.js';

const upper = (): ValidatorFunction<unknown, string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleUpperCase());
};

export default upper;
