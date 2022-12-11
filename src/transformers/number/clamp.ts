import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const clamp =
    (min: number, max: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (min >= value) {
            return Success(min);
        }
        if (max <= value) {
            return Success(max);
        }
        return Success(value);
    };

export default clamp;
