import { Failure, Ignore, Success, ValidatorFunction } from '../../types';

const lte =
    (max: number): ValidatorFunction<number> =>
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
