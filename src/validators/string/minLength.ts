import { ValidatorFunction } from '../../types';
import validateCondition from '../validateCondition';

const minLength = (n: number): ValidatorFunction<string> =>
    validateCondition(
        (f) => f.length >= n,
        (_, { name }) => `Field ${name} should be at least ${n} characters long.`
    );

export default minLength;
