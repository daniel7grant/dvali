import { SyncValidatorFunction } from '../types.js';
import validateCondition from './validateCondition.js';

const oneOf = <T>(items: T[]): SyncValidatorFunction<T, T> =>
    validateCondition(
        (value) => items.indexOf(value) !== -1,
        (_, conf) => `Field ${conf.name} should be one of ${items.join(', ')}.`
    );

export default oneOf;
