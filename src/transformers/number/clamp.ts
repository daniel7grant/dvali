import { Ignore, Success, ValidatorFunction } from '../../types.js';

const clamp =
    (min: number, max: number): ValidatorFunction<number> =>
    (value, conf) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            return Ignore();
        }
        if (min >= value) {
            return Success(min);
        }
        if (max <= value) {
            return Success(max);
        }
        return Success(value);
    };

export default clamp;
