import { Ignore, Success, ValidatorFunction } from '../../types.js';

const upper = (): ValidatorFunction<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleUpperCase());
};

export default upper;
