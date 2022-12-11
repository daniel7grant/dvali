import { Success, SyncValidatorFunction } from '../types.js';

function optional<T>(): SyncValidatorFunction<T, T | undefined> {
    return (value, conf) => {
        if (typeof value === 'undefined') {
            return Success(value);
        }
        return Success(value);
    };
}

export default optional;
