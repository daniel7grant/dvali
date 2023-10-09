import { SyncValidatorFunction } from '../../types.js';

const trim = ():SyncValidatorFunction<string, string> => (value, conf) => {
    return value.trim();
};

export default trim;
