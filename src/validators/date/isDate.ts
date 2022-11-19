import { ValidatorFunction } from '../../types.js';
import validateCondition from '../validateCondition.js';

const isDate = (): ValidatorFunction<unknown, Date> =>
    validateCondition(
        (value) => value instanceof Date && !Number.isNaN(value.getTime()),
        (_, conf) => `Field ${conf.name} should be a valid date.`
    );

export default isDate;
