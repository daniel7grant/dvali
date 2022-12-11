import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const maxLength =
    (max: number): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        if (value.length <= max) {
            return Success(value);
        }
        return Failure(`Field ${conf.name} length should be at most ${max} characters.`);
    };

export default maxLength;
