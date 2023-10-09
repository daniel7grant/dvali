import { SyncValidatorFunction } from '../../types.js';

const clamp =
    (min: number, max: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (min >= value) {
            return min;
        }
        if (max <= value) {
            return max;
        }
        return value;
    };

export default clamp;
