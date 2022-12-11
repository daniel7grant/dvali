import { Failure, Ignore, Success, SyncValidatorFunction } from '../../types.js';

const gt =
    (min: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value > min) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be greater than ${min}.`);
    };

export default gt;
