import { ValidatorFunction } from './dvali';
import validateCondition from './validateCondition';
import { validateRegex } from './validateRegex';

export const required = (): ValidatorFunction =>
    validateCondition(
        (f) => f !== undefined && f !== null,
        (_, { name }) => `Field ${name} is required.`
    );

export const isEmail = (): ValidatorFunction<string> =>
    validateRegex(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        (_, { name }) => `Field ${name} should be an email.`
    );

export const minLength = (n: number): ValidatorFunction<string> =>
    validateCondition(
        (f) => f.length >= n,
        (_, { name }) => `Field ${name} should be at least ${n} characters long.`
    );

export const containsAlpha = (): ValidatorFunction<string> =>
    validateRegex(/[a-z]/i, (_, { name }) => `Field ${name} should contain some letters.`);

export const containsNumber = (): ValidatorFunction<string> =>
    validateRegex(/[0-9]/, (_, { name }) => `Field ${name} should contain some numbers.`);

export const isUrl = (): ValidatorFunction<string> =>
    validateRegex(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        (_, { name }) => `Field ${name} should be an url.`
    );
