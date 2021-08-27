import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const isDate = (): ValidatorFunction<Date> =>
    validateCondition(
        (value) => value instanceof Date && !Number.isNaN(value.getTime()),
        (_, conf) => `Field ${conf.name} should be a valid date.`
    );

export default isDate;
