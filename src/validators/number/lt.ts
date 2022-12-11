import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const lt =
    (max: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value < max) {
            return Success(value);
        }

        return Failure(`Field ${conf.name} should be less than ${max}.`);
    };

export default lt;
