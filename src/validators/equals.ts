import { ValidatorFunction } from '../types.js';
import validateCondition from './validateCondition.js';

const equals = <T>(to: T): ValidatorFunction<unknown, T> =>
    validateCondition(
        (value) => value === to,
        (_, conf) => `Field ${conf.name} should be equal to ${to}.`
    );

export default equals;
