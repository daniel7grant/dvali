import { SyncValidatorFunction } from '../../types.js';

const lte =
    (max: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value <= max) {
            return value;
        }

        throw `Field ${conf.name} should be less than or equal to ${max}.`
    };

export default lte;
