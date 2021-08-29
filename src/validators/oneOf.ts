import { ValidatorFunction } from '../types';
import validateCondition from './validateCondition';

const oneOf = <T>(items: T[]): ValidatorFunction<T> =>
    validateCondition(
        (value) => items.indexOf(value) !== -1,
        (_, conf) => `Field ${conf.name} should be one of ${items.join(', ')}.`
    );

export default oneOf;
