import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const toMultipleOf =
    (n: number, round = Math.round): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        return Success(round(value / n) * n);
    };

export default toMultipleOf;
