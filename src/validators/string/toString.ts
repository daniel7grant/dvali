import { Success, SyncValidatorFunction } from '../../types.js';

const toString = (): SyncValidatorFunction<unknown, string> => (value, conf) => {
    return Success('' + value);
};

export default toString;
