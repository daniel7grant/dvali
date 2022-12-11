import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const upper = ():SyncValidatorFunction<string, string> => (value, conf) => {
    return Success(value.toLocaleUpperCase());
};

export default upper;
