import validate from '../validate.js';
import { ValidatorFunction, Validator, Success } from '../types.js';

const optional =
    <T>(validators: Validator<T>): ValidatorFunction<T | undefined> =>
    (value, conf) => {
        if (typeof value === 'undefined') {
            return Success();
        }
        return validate(validators, conf)(value);
    };

export default optional;
