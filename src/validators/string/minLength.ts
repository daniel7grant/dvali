import { SyncValidatorFunction } from '../../types.js';

const minLength =
    (min: number): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        if (value.length >= min) {
            return value;
        }
        throw `Field ${conf.name} length should be at least ${min} characters.`
    };

export default minLength;
