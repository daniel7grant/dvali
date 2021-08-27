import { Failure, Success, ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const isInt = (): ValidatorFunction<number> =>
    validateCondition(
        (value) => Number.isInteger(value),
        (_, conf) => `Field ${conf.name} should be an integer.`
    );

export default isInt;
