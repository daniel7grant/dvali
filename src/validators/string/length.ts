import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const length =
    (n: number): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        if (value.length === n) {
            return Success(value);
        }
        return Failure(`Field ${conf.name} length should be exactly ${n} characters.`);
    };

export default length;
