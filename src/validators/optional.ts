import validate from '../validate.js';
import { Validator, Success, SyncValidator, ValidatorConfiguration } from '../types.js';

function optional<I, O>(
    validators: Validator<I, unknown, unknown, O>
): (val: I, c: ValidatorConfiguration) => O | undefined | Promise<O | undefined> {
    return (value, conf) => {
        if (typeof value === 'undefined') {
            return Success();
        }
        return validate(validators, conf)(value);
    };
}

export default optional;
