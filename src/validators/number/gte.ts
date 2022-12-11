import { SyncValidatorFunction } from '../../types.js';

const gte =
    (min: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value >= min) {
            return value;
        }

        throw `Field ${conf.name} should be greater than or equal to ${min}.`
    };

export default gte;
