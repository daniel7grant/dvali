import validate from './validate';
import arrayOf from './arrayOf';
import validateCondition from './validators/validateCondition';
import validateRegex from './validators/validateRegex';
import isEmail from './validators/string/isEmail';
import isUrl from './validators/string/isUrl';
import minLength from './validators/string/minLength';
import {
    Failure,
    Ignore,
    FailureFunction,
    Success,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
} from './types';

export type {
    FailureFunction,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
};

export {
    arrayOf,
    Failure,
    Ignore,
    Success,
    isEmail,
    isUrl,
    minLength,
    validate,
    validateCondition,
    validateRegex,
};

export default validate;
