import { SyncValidatorFunction } from '../../types.js';

const tryInt = (): SyncValidatorFunction<unknown, number> => (value, conf) => {
    const parsed = Number.parseInt(value as any);
    if (!Number.isNaN(parsed)) {
        return parsed;
    }
    throw `Field ${conf.name} should be an integer.`
};

export default tryInt;
