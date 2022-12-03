import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const trim = ():SyncValidatorFunction<unknown, string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.trim());
};

export default trim;
