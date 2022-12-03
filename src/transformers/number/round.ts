import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const round = ():SyncValidatorFunction<unknown, number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.round(value));
};

export default round;
