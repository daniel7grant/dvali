import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const upper = ():SyncValidatorFunction<unknown, string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleUpperCase());
};

export default upper;
