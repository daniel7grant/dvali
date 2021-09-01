import { Success, ValidatorFunction } from '../../types';

const toDate = (): ValidatorFunction<Date> => (value, conf) => {
    const parsed = value instanceof Date ? value : new Date(value);
    return Success(parsed);
};

export default toDate;
