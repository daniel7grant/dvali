import { Success, SyncValidatorFunction } from '../../types.js';

const toDate = (): SyncValidatorFunction<string | number | Date, Date> => (value, conf) => {
    const parsed = value instanceof Date ? value : new Date(value);
    return Success(parsed);
};

export default toDate;
