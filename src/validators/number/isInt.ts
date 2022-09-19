import { Failure, Success, ValidatorFunctionAsync } from '../../types.js';
import validateCondition from '../validateCondition.js';

const isInt = (): ValidatorFunctionAsync<number> =>
    validateCondition(
        (value) => Number.isInteger(value),
        (_, conf) => `Field ${conf.name} should be an integer.`
    );

export default isInt;
