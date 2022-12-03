import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const isMultipleOf =
    (n: number): SyncValidatorFunction<unknown, number> =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }

        if (value % n === 0) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be the multiple of ${n}.`);
    };

export default isMultipleOf;
