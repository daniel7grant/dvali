import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const round = (): ValidatorFunctionAsync<number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.round(value));
};

export default round;
