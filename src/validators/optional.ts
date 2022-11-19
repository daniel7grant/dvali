import validate from '../validate.js';
import { ValidatorFunction, Validator, Success } from '../types.js';

const optional =
    <O>(
        validators: Validator<unknown, unknown, unknown, O>
    ): ValidatorFunction<unknown, O | undefined> =>
    (value, conf) => {
        if (typeof value === 'undefined') {
            return Success();
        }
        return validate(validators, conf)(value);
    };

export default optional;
