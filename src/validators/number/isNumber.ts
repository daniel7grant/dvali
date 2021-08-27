import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const isNumber = (): ValidatorFunction<number> =>
    validateCondition(
        (value) => typeof value === 'number' && !Number.isNaN(value),
        (_, conf) => `Field ${conf.name} should be a number.`
    );

export default isNumber;
