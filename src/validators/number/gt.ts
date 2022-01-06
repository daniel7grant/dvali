import { Failure, Ignore, Success, ValidatorFunction } from '../../types.js';

const gt =
    (min: number): ValidatorFunction<number> =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }

        if (value > min) {
            return Success();
        }

        return Failure(`Field ${conf.name} should be greater than ${min}.`);
    };

export default gt;
