import {
    Promisey,
    Validator,
    ValidatorObject,
    ValidatorFunctionAsync,
    ValidatorConfiguration,
} from './types.js';

export const isValidatorFunctionAsyncList = <T>(
    validator: Validator<T>
): validator is ValidatorFunctionAsync<T>[] => {
    return typeof validator === 'object' && Array.isArray(validator);
};

export const isValidatorObject = <T>(validator: Validator<T>): validator is ValidatorObject<T> => {
    return typeof validator === 'object' && !Array.isArray(validator);
};

export const isValidatorFunctionAsync = <T>(
    validator: Validator<T>
): validator is ValidatorFunctionAsync<T> => {
    return typeof validator === 'function';
};

export const isPromise = <T>(promise: any): promise is Promisey<T> => {
    return typeof promise === 'object' && promise !== null && typeof promise.then === 'function';
};

export const promisifyValidator = function <T>(validator: ValidatorFunctionAsync<T>) {
    return function (value: any, conf: ValidatorConfiguration): Promise<T> {
        const p = validator(value, conf);
        if (isPromise(p)) {
            return p.then((newValue) => (typeof newValue !== 'undefined' ? newValue : value));
        }
        if (p === undefined) {
            return Promise.resolve(value);
        }
        return Promise.resolve(p);
    };
};
