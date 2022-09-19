import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const gt =
    (min: number): ValidatorFunctionAsync<number> =>
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
