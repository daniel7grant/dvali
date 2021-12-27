import { Ignore, Success, ValidatorFunction } from '../../types';

const toMultipleOf =
    (n: number, round = Math.round): ValidatorFunction<number> =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }
        return Success(round(value / n) * n);
    };

export default toMultipleOf;
