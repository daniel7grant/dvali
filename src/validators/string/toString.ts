import { SyncValidatorFunction } from '../../types.js';

const toString = (): SyncValidatorFunction<unknown, string> => (value, conf) => {
    return '' + value;
};

export default toString;
