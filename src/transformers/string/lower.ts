import { SyncValidatorFunction } from '../../types.js';

const lower = (): SyncValidatorFunction<string, string> => (value, conf) => {
    return value.toLocaleLowerCase();
};

export default lower;
