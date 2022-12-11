import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const ceil = (): SyncValidatorFunction<number, number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore(value);
    }
    return Success(Math.ceil(value));
};

export default ceil;
