import { ValidatorFunction } from '../../types';
import validateRegex from '../validateRegex';

const isUrl = (): ValidatorFunction<string> =>
    validateRegex(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        (_, { name }) => `Field ${name} should be an url.`
    );

export default isUrl;
