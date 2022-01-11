import { Validator, ValidatorObject, ValidatorFunction, ValidatorFunctionAsync } from './types.js';

export const isValidatorFunctionList = <T>(
    validator: Validator<T>
): validator is ValidatorFunction<T>[] => {
    return typeof validator === 'object' && Array.isArray(validator);
};

export const isValidatorObject = <T>(validator: Validator<T>): validator is ValidatorObject<T> => {
    return typeof validator === 'object' && !Array.isArray(validator);
};

export const isValidatorFunction = <T>(
    validator: Validator<T>
): validator is ValidatorFunction<T> => {
    return typeof validator === 'function';
};

export const isPromise = <T>(promise: T | Promise<T>): promise is Promise<T> => {
    return (
        typeof promise === 'object' &&
        promise instanceof Promise &&
        typeof promise.then === 'function'
    );
};

export const promisifyValidator = function <T>(
    validator: ValidatorFunction<T>
): ValidatorFunctionAsync<T> {
    return function (value, conf) {
        const p = validator(value, conf);
        if (isPromise(p)) {
            return p;
        }
        return Promise.resolve(p);
    };
};
