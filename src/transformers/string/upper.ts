import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const upper = (): ValidatorFunctionAsync<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleUpperCase());
};

export default upper;
