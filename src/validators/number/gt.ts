import { SyncValidatorFunction } from '../../types.js';

const gt =
    (min: number): SyncValidatorFunction<number, number> =>
    (value, conf) => {
        if (value > min) {
            return value;
        }

        throw `Field ${conf.name} should be greater than ${min}.`
    };

export default gt;
