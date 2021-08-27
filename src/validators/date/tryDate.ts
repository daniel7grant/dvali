import { Failure, Success, ValidatorFunction } from '../../types';

const tryDate = (): ValidatorFunction<Date> => async (value, conf) => {
    const parsed = value instanceof Date ? value : new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
        return Success(parsed);
    }
    return Failure(`Field ${conf.name} should be a valid date.`);
};

export default tryDate;
