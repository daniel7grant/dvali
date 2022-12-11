import {
    AsyncValidatingFunction,
    SyncValidatingFunction,
    SyncValidator,
    ValidatingFunction,
    Validator,
    ValidatorConfiguration,
} from '../types.js';
import validate, { isPromise } from '../validate.js';

function optional<T>(
    validator: SyncValidator<any, any, any, T>
): SyncValidatingFunction<unknown, T | undefined>;
function optional<T>(
    validator: Validator<any, any, any, T>
): AsyncValidatingFunction<unknown, T | undefined>;
function optional<T>(
    validator: Validator<any, any, any, T>
): (value: unknown, conf: ValidatorConfiguration) => T | undefined | Promise<T | undefined> {
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
