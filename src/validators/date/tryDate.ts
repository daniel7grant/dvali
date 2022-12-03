import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const tryDate = (): SyncValidatorFunction<string | number | Date, Date> => (value, conf) => {
    const parsed = value instanceof Date ? value : new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
        return Success(parsed);
    }
    return Failure(`Field ${conf.name} should be a valid date.`);
};

export default tryDate;
