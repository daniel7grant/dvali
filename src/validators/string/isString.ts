import { ValidatorFunction } from '../../types.js';
import validateCondition from '../validateCondition.js';

const isString = (): ValidatorFunction<unknown, string> =>
    validateCondition(
        (value) => typeof value === 'string',
        (_, conf) => `Field ${conf.name} should be string.`
    );

export default isString;
