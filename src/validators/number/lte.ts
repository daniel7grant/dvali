import { Failure, Ignore, Success, ValidatorFunction } from '../../types.js';

const lte =
    (max: number): ValidatorFunction<unknown, number> =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }

        if (value <= max) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be less than or equal to ${max}.`);
    };

export default lte;
