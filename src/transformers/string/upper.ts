import { SyncValidatorFunction } from '../../types.js';

const upper = ():SyncValidatorFunction<string, string> => (value, conf) => {
    return value.toLocaleUpperCase();
};

export default upper;
