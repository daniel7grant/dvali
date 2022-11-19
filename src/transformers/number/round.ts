import { Ignore, Success, ValidatorFunction } from '../../types.js';

const round = (): ValidatorFunction<unknown, number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.round(value));
};

export default round;
