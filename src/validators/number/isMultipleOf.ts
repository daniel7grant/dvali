import { SyncValidatorFunction } from '../../types.js';

const isMultipleOf =
    (n: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value % n === 0) {
            return value;
        }

        throw `Field ${conf.name} should be the multiple of ${n}.`
    };

export default isMultipleOf;
