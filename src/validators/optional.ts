import { SyncValidatorFunction } from '../types.js';

function optional<T>(): SyncValidatorFunction<T, T | undefined> {
    return (value, conf) => {
        if (typeof value === 'undefined') {
            return value;
        }
        return value;
    };
}

export default optional;
