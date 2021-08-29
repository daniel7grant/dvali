import { ValidatorFunction } from '../types';
import validateCondition from './validateCondition';

const equals = <T>(to: T): ValidatorFunction<T> =>
    validateCondition(
        (value) => value === to,
        (_, conf) => `Field ${conf.name} should be equal to ${to}.`
    );

export default equals;
