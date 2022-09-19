import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const toMultipleOf =
    (n: number, round = Math.round): ValidatorFunctionAsync<number> =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }
        return Success(round(value / n) * n);
    };

export default toMultipleOf;
