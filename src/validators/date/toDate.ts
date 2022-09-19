import { Success, ValidatorFunctionAsync } from '../../types.js';

const toDate = (): ValidatorFunctionAsync<Date> => (value, conf) => {
    const parsed = value instanceof Date ? value : new Date(value);
    return Success(parsed);
};

export default toDate;
