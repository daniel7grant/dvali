import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const minLength =
    (min: number): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        if (value.length >= min) {
            return Success(value);
        }
        return Failure(`Field ${conf.name} length should be at least ${min} characters.`);
    };

export default minLength;
