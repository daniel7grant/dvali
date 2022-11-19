import { ValidatorFunction } from '../../types.js';
import validateRegex from '../validateRegex.js';

const isEmail = (): ValidatorFunction<string, string> =>
    validateRegex(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        (_, { name }) => `Field ${name} should be an email.`
    );

export default isEmail;
