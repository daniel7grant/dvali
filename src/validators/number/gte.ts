import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const gte =
    (min: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value >= min) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be greater than or equal to ${min}.`);
    };

export default gte;
