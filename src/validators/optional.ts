import validate from '../validate.js';
import { ValidatorFunctionAsync, Validator, Success } from '../types.js';

const optional =
    <T>(validators: Validator<T>): ValidatorFunctionAsync<T | undefined> =>
    (value, conf) => {
        if (typeof value === 'undefined') {
            return Success();
        }
        return validate(validators, conf)(value);
    };

export default optional;
