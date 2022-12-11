import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const isMultipleOf =
    (n: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value % n === 0) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be the multiple of ${n}.`);
    };

export default isMultipleOf;
