import { SyncValidatorFunction } from '../../types.js';

const tryDate = (): SyncValidatorFunction<string | number | Date, Date> => (value, conf) => {
    const parsed = value instanceof Date ? value : new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed;
    }
    throw `Field ${conf.name} should be a valid date.`
};

export default tryDate;
