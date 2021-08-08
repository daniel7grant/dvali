import { ValidatorFunction } from '../../types';
import validateRegex from '../validateRegex';

const isEmail = (): ValidatorFunction<string> =>
    validateRegex(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        (_, { name }) => `Field ${name} should be an email.`
    );

export default isEmail;
