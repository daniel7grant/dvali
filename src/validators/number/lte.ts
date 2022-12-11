import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const lte =
    (max: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value <= max) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be less than or equal to ${max}.`);
    };

export default lte;
