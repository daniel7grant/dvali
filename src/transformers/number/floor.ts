import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const floor = (): ValidatorFunctionAsync<number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.floor(value));
};

export default floor;
