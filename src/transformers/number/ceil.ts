import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const ceil = (): ValidatorFunctionAsync<number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.ceil(value));
};

export default ceil;
