import { SyncValidatorFunction } from '../../types.js';

const maxLength =
    (max: number): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        if (value.length <= max) {
            return value;
        }
        throw `Field ${conf.name} length should be at most ${max} characters.`
    };

export default maxLength;
