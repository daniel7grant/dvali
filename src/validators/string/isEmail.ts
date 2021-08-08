import { ValidatorFunction } from '../../dvali';
import validateRegex from '../validateRegex';

export const isEmail = (): ValidatorFunction<string> =>
    validateRegex(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        (_, { name }) => `Field ${name} should be an email.`
    );
