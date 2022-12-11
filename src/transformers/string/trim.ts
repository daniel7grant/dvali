import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const trim = ():SyncValidatorFunction<string, string> => (value, conf) => {
    return Success(value.trim());
};

export default trim;
