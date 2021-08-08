import { ValidatorFunction } from '../../dvali';
import validateCondition from '../validateCondition';

export const minLength = (n: number): ValidatorFunction<string> =>
    validateCondition(
        (f) => f.length >= n,
        (_, { name }) => `Field ${name} should be at least ${n} characters long.`
    );
