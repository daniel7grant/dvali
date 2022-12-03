import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const floor = ():SyncValidatorFunction<unknown, number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.floor(value));
};

export default floor;
