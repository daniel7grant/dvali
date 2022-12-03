import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const lower = ():SyncValidatorFunction<unknown, string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleLowerCase());
};

export default lower;
