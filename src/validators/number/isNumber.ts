import { ValidatorFunction } from '../../types.js';
import validateCondition from '../validateCondition.js';

const isNumber = (): ValidatorFunction<unknown, number> =>
    validateCondition(
        (value) => typeof value === 'number' && !Number.isNaN(value),
        (_, conf) => `Field ${conf.name} should be a number.`
    );

export default isNumber;
