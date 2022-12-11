import { SyncValidatorFunction, SyncValidatorFunctionInner, SyncValidatorFunctionList, SyncValidatorFunctionList1, SyncValidatorFunctionList2, SyncValidatorFunctionList3, SyncValidatorObject, Validator, ValidatorConfiguration, ValidatorFunction, ValidatorFunctionList, ValidatorFunctionList1, ValidatorFunctionList2, ValidatorFunctionList3, ValidatorObject, ValidatorState } from './types.js';

function resolveValidatorList<I, A, B, O>(validators: SyncValidatorFunctionList<I, A, B, O>, value: any, conf: ValidatorConfiguration): O;
function resolveValidatorList<I, A, B, O>(validators: ValidatorFunctionList<I, A, B, O>, value: any, conf: ValidatorConfiguration): Promise<O>;
function resolveValidatorList<I, A, B, O>(validators: ValidatorFunctionList<I, A, B, O>, value: any, conf: ValidatorConfiguration): O | Promise<O> {
    const result = (validators as ValidatorFunction<unknown, unknown>[]).reduce<ValidatorState<unknown> | Promise<ValidatorState<unknown>>>(
        (previousState, validator) => {
            if (isPromise(previousState)) {
                return previousState.then(({ value, failures }) => {
                    const result = validator(value, conf);
                    if (isPromise(result)) {
                        return result.then(
                            (newValue) => ({
                                value: typeof newValue !== 'undefined' ? newValue : value,
                                failures,
                            }),
                            (failure) => ({
                                value,
                                failures: failures.concat(failure),
                            })
                        );
                    }
                    return {
                        value: typeof result !== 'undefined' ? result : value,
                        failures: failures,
                    };
                });
            }
            const result: unknown = validator(value, conf);
            if (isPromise(result)) {
                return result.then(
                    (newValue) => ({
                        value: typeof newValue !== 'undefined' ? newValue : value,
                        failures: previousState.failures,
                    }),
                    (failure) => ({
                        value,
                        failures: previousState.failures.concat(failure),
                    })
                );
            }
            return {
                value: typeof result !== 'undefined' ? result : value,
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
        const result = validate<any, any, any, O[keyof O]>(validator[key as keyof O] as any, {
            ...conf,
            name: key as string,
            path: conf.path.concat(key as string),
            parent: testValue,
        })(testValue[key]);
        if (isPromise(result)) {
            return result.then(
                (value) =>
                    ({
                        value: [key, typeof result === 'undefined' ? testValue[key] : value],
                        failures: [],
                    } as ValidatorState<[keyof O, O[keyof O]]>),
                (failure) => ({ value: [key, testValue[key]], failures: Array.isArray(failure) ? failure : [failure] } as ValidatorState<[keyof O, O[keyof O]]>)
            );
        }
        return {
            value: [key, typeof result === 'undefined' ? testValue[key] : result],
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

const isValidatorFunctionList = <I, A, B, O>(validator: Validator<I, A, B, O>): validator is ValidatorFunctionList<I, A, B, O> => {
    return typeof validator === 'object' && Array.isArray(validator);
};

const isValidatorObject = <I, A, B, O>(validator: Validator<I, A, B, O>): validator is ValidatorObject<O> => {
    return typeof validator === 'object' && !Array.isArray(validator);
};

const isValidatorFunction = <I, A, B, O>(validator: Validator<I, A, B, O>): validator is ValidatorFunction<I, O> => {
    return typeof validator === 'function';
};

export function validate<I, O>(v: SyncValidatorFunctionInner<I, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => O;
export function validate<I, O>(v: SyncValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => O;
export function validate<I, A, O>(v: SyncValidatorFunctionList2<I, A, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => O;
export function validate<I, A, B, O>(v: SyncValidatorFunctionList3<I, A, B, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => O;
export function validate<I, O>(v: ValidatorFunction<I, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export function validate<I, O>(v: ValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export function validate<I, A, O>(v: ValidatorFunctionList2<I, A, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export function validate<I, A, B, O>(v: ValidatorFunctionList3<I, A, B, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export function validate<I, O>(v: SyncValidatorObject<O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => O;
export function validate<I, O>(v: ValidatorObject<O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>;
export function validate<I, A, B, O>(validator: Validator<I, A, B, O>, validateConf?: Partial<ValidatorConfiguration>): (val: I, testConf?: Partial<ValidatorConfiguration>) => O | Promise<O>;
export function validate<I, A, B, O>(validator: Validator<I, A, B, O>, validateConf?: Partial<ValidatorConfiguration>): (val: I, testConf?: Partial<ValidatorConfiguration>) => O | Promise<O> {
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
                    return result
                        .then((newValue) => (typeof newValue !== 'undefined' ? newValue : testValue))
                        .catch((failures) => {
                            if (Array.isArray(failures)) {
                                return Promise.reject(failures);
                            }
                            return Promise.reject([failures]);
                        });
                }
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

export default validate;
