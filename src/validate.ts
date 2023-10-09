import { AsyncValidatingFunction, SyncValidatingFunction, SyncValidatingFunctionInner, SyncValidatorFunctionInner, SyncValidatorFunctionList, SyncValidatorFunctionList1, SyncValidatorFunctionList10, SyncValidatorFunctionList11, SyncValidatorFunctionList12, SyncValidatorFunctionList13, SyncValidatorFunctionList14, SyncValidatorFunctionList15, SyncValidatorFunctionList16, SyncValidatorFunctionList17, SyncValidatorFunctionList18, SyncValidatorFunctionList19, SyncValidatorFunctionList2, SyncValidatorFunctionList20, SyncValidatorFunctionList21, SyncValidatorFunctionList22, SyncValidatorFunctionList23, SyncValidatorFunctionList24, SyncValidatorFunctionList3, SyncValidatorFunctionList4, SyncValidatorFunctionList5, SyncValidatorFunctionList6, SyncValidatorFunctionList7, SyncValidatorFunctionList8, SyncValidatorFunctionList9, SyncValidatorObject, ValidatingFunction, ValidatorInner, ValidatorConfiguration, ValidatorFunction, ValidatorFunctionList, ValidatorFunctionList1, ValidatorFunctionList10, ValidatorFunctionList11, ValidatorFunctionList12, ValidatorFunctionList13, ValidatorFunctionList14, ValidatorFunctionList15, ValidatorFunctionList16, ValidatorFunctionList17, ValidatorFunctionList18, ValidatorFunctionList19, ValidatorFunctionList2, ValidatorFunctionList20, ValidatorFunctionList21, ValidatorFunctionList22, ValidatorFunctionList23, ValidatorFunctionList24, ValidatorFunctionList3, ValidatorFunctionList4, ValidatorFunctionList5, ValidatorFunctionList6, ValidatorFunctionList7, ValidatorFunctionList8, ValidatorFunctionList9, ValidatorObject, ValidatorState } from './types.js';

function resolveValidatorList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validators: SyncValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, value: any, conf: ValidatorConfiguration): O;
function resolveValidatorList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validators: ValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, value: any, conf: ValidatorConfiguration): Promise<O>;
function resolveValidatorList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validators: ValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, value: any, conf: ValidatorConfiguration): O | Promise<O> {
    // TODO: we should bail by default
    const result = (validators as ValidatorFunction<unknown, unknown>[]).reduce<ValidatorState<unknown> | Promise<ValidatorState<unknown>>>(
        (previousState, validator) => {
            // TODO: refactor this to a unified function
            if (isPromise(previousState)) {
                return previousState.then(({ value, failures }) => {
                    const result: unknown = validator(value, conf);
                    if (isPromise(result)) {
                        return result.then(
                            (newValue) => {
                                return {
                                    value: newValue,
                                    failures,
                                };
                            },
                            (failure) => ({
                                value,
                                failures: failures.concat(failure),
                            })
                        );
                    }
                    return {
                        value: result,
                        failures: failures,
                    };
                });
            }
            const result: unknown = validator(value, conf);
            if (isPromise(result)) {
                return result.then(
                    (newValue) => {
                        return {
                            value: newValue,
                            failures: previousState.failures,
                        };
                    },
                    (failure) => ({
                        value,
                        failures: previousState.failures.concat(failure),
                    })
                );
            }
            return {
                value: result,
                failures: previousState.failures,
            };
        },
        { value, failures: [] } as ValidatorState<unknown>
    );

    if (isPromise(result)) {
        return result.then(({ value, failures }) => {
            if (failures.length > 0) {
                throw failures;
            }
            return value as O;
        });
    }

    // TODO: handles multiple failures
    if (result.failures.length > 0) {
        throw result.failures;
    }
    return result.value as O;
}

function resolveValidatorObject<O>(validator: SyncValidatorObject<O>, testValue: any, conf: ValidatorConfiguration): O;
function resolveValidatorObject<O>(validator: ValidatorObject<O>, testValue: any, conf: ValidatorConfiguration): Promise<O>;
function resolveValidatorObject<O>(validator: ValidatorObject<O>, testValue: any, conf: ValidatorConfiguration): O | Promise<O> {
    const keys = Object.keys(validator) as (keyof O)[];
    const results = keys.map((key) => {
        const result = validate<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, O[keyof O]>(validator[key as keyof O] as any, {
            ...conf,
            name: key as string,
            path: conf.path.concat(key as string),
            parent: testValue,
        })(testValue[key]);
        if (isPromise(result)) {
            return result.then(
                (value) =>
                    ({
                        value: [key, value],
                        failures: [],
                    } as ValidatorState<[keyof O, O[keyof O]]>),
                (failure) => ({ value: [key, testValue[key]], failures: Array.isArray(failure) ? failure : [failure] } as ValidatorState<[keyof O, O[keyof O]]>)
            );
        }
        return {
            value: [key, result] as [keyof O, O[keyof O]],
            failures: [],
        } as ValidatorState<[keyof O, O[keyof O]]>;
    });

    if (!hasNoPromise(results)) {
        return Promise.all(results).then((results) => {
            const failures = results.flatMap((result) => result.failures);
            if (failures.length > 0) {
                throw failures;
            }
            return Object.fromEntries(results.map(({ value }) => value)) as O;
        });
    }

    const failures = results.flatMap((result) => result.failures);
    if (failures.length > 0) {
        throw failures;
    }
    return Object.fromEntries(results.map(({ value }) => value)) as O;
}

export const isPromise = <T>(value: any): value is Promise<T> => {
    return typeof value === 'object' && value !== null && typeof value.then === 'function';
};

export const hasNoPromise = <T>(value: (T | Promise<T>)[]): value is T[] => {
    return !value.some(isPromise);
};

const isValidatorFunctionList = <I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validator: ValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>): validator is ValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O> => {
    return typeof validator === 'object' && Array.isArray(validator);
};

const isValidatorObject = <I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validator: ValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>): validator is ValidatorObject<O> => {
    return typeof validator === 'object' && !Array.isArray(validator);
};

const isValidatorFunction = <I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validator: ValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>): validator is ValidatorFunction<I, O> => {
    return typeof validator === 'function';
};

export function validate<I, O>(v: SyncValidatorFunctionInner<I, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, O>(v: SyncValidatingFunctionInner<I, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, O>(v: SyncValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, O>(v: SyncValidatorFunctionList2<I, A, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, O>(v: SyncValidatorFunctionList3<I, A, B, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, O>(v: SyncValidatorFunctionList4<I, A, B, C, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, O>(v: SyncValidatorFunctionList5<I, A, B, C, D, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, O>(v: SyncValidatorFunctionList6<I, A, B, C, D, E, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, O>(v: SyncValidatorFunctionList7<I, A, B, C, D, E, F, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, O>(v: SyncValidatorFunctionList8<I, A, B, C, D, E, F, G, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, O>(v: SyncValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, O>(v: SyncValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, O>(v: SyncValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, O>(v: SyncValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, O>(v: SyncValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>(v: SyncValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>(v: SyncValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>(v: SyncValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>(v: SyncValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>(v: SyncValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>(v: SyncValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>(v: SyncValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>(v: SyncValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>(v: SyncValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>(v: SyncValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(v: SyncValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>
export function validate<I, O>(v: ValidatorFunction<I, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, O>(v: ValidatingFunction<I, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, O>(v: ValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, O>(v: ValidatorFunctionList2<I, A, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, O>(v: ValidatorFunctionList3<I, A, B, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, O>(v: ValidatorFunctionList4<I, A, B, C, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, O>(v: ValidatorFunctionList5<I, A, B, C, D, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, O>(v: ValidatorFunctionList6<I, A, B, C, D, E, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, O>(v: ValidatorFunctionList7<I, A, B, C, D, E, F, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, O>(v: ValidatorFunctionList8<I, A, B, C, D, E, F, G, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, O>(v: ValidatorFunctionList9<I, A, B, C, D, E, F, G, H, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, O>(v: ValidatorFunctionList10<I, A, B, C, D, E, F, G, H, J, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, O>(v: ValidatorFunctionList11<I, A, B, C, D, E, F, G, H, J, K, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, O>(v: ValidatorFunctionList12<I, A, B, C, D, E, F, G, H, J, K, L, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, O>(v: ValidatorFunctionList13<I, A, B, C, D, E, F, G, H, J, K, L, M, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>(v: ValidatorFunctionList14<I, A, B, C, D, E, F, G, H, J, K, L, M, P, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>(v: ValidatorFunctionList15<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>(v: ValidatorFunctionList16<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>(v: ValidatorFunctionList17<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>(v: ValidatorFunctionList18<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>(v: ValidatorFunctionList19<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>(v: ValidatorFunctionList20<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>(v: ValidatorFunctionList21<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>(v: ValidatorFunctionList22<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>(v: ValidatorFunctionList23<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(v: ValidatorFunctionList24<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>
export function validate<I, O>(v: SyncValidatorObject<O>, c?: Partial<ValidatorConfiguration>): SyncValidatingFunction<I, O>;
export function validate<I, O>(v: ValidatorObject<O>, c?: Partial<ValidatorConfiguration>): AsyncValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validator: ValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, validateConf?: Partial<ValidatorConfiguration>): ValidatingFunction<I, O>;
export function validate<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validator: ValidatorInner<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>, validateConf?: Partial<ValidatorConfiguration>): ValidatingFunction<I, O> {
    return function (testValue: any, testConf) {
        // Set defaults to configuration
        const conf: ValidatorConfiguration = {
            name: 'object',
            path: [],
            original: testValue,
            parent: testValue,
            ...validateConf,
            ...testConf,
        };

        // Start the validation
        if (isValidatorFunctionList(validator)) {
            // Array of functions mean a list of validators
            return resolveValidatorList(validator, testValue, conf);
        } else if (isValidatorObject(validator)) {
            // It is an object, all properties should be validated recursively
            if (typeof testValue !== 'object' || testValue === null) {
                throw `Field ${conf.name} should be an object.`;
            }

            return resolveValidatorObject(validator, testValue, conf);
        } else if (isValidatorFunction(validator)) {
            // It is a function, validate with it
            try {
                const result = validator(testValue, conf);
                if (isPromise(result)) {
                    return result.catch((failures) => {
                        if (Array.isArray(failures)) {
                            return Promise.reject(failures);
                        }
                        return Promise.reject([failures]);
                    });
                }
                return result;
                // TODO: For some reason, without this it won't compile ???
                return result !== 'undefined' ? result : testValue;
            } catch (failures) {
                if (Array.isArray(failures)) {
                    throw failures;
                }
                throw [failures];
            }
        } else {
            // Shouldn't go on here
            throw new Error('Validator should be an array, object or function.');
        }
    };
}

// TODO: add identity transform function

export default validate;
