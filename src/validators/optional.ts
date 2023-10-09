import { AsyncValidatingFunction, SyncValidatingFunction, SyncValidator, ValidatorConfiguration, Validator } from '../types.js';
import validate, { isPromise } from '../validate.js';

function optional<T>(validator: SyncValidator<unknown, T>): SyncValidatingFunction<unknown, T | undefined>;
function optional<T>(validator: Validator<unknown, T>): AsyncValidatingFunction<unknown, T | undefined>;
function optional<T>(validator: Validator<unknown, T>): (value: unknown, conf: ValidatorConfiguration) => T | undefined | Promise<T | undefined> {
    return (value, conf) => {
        if (typeof value === 'undefined') {
            return value;
        }
        const result = validate(validator)(value);
        if (isPromise(result)) {
            return result;
        }
        return result;
    };
}

export default optional;
