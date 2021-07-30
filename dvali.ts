export type SuccessType<T> = T | null | undefined;
export type FailureType = string;

export interface ValidatorState<T> {
    value: T;
    failures: FailureType[];
}

export interface ValidatorConfiguration {
    name: string;
    path: string[];
    original: any;
    parent: any;
}

export interface ValidatorFunction<T = any> {
    (value: T, conf: ValidatorConfiguration): Promise<SuccessType<T>>;
}

export type ValidatorObject<T> = {
    [key in keyof T]: Validator<T[key]>;
};

export type Validator<T> = ValidatorObject<T> | ValidatorFunction<T>[] | ValidatorFunction<T>;

export type SanitizedObject<T> = {
    [key in keyof T]?: SanitizedValue<T[key]>;
};

export type SanitizedValue<T> = T | undefined | SanitizedObject<T>;

interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): FailureType;
}

interface ConditionFunction<T> {
    (v: T, conf: ValidatorConfiguration): boolean;
}

export const Success = function <T>(t?: T): T | undefined {
    return t;
};

export const Failure = function (t: string): never {
    throw t;
};

const resolveValidator = function <T>(
    validatorFunction: ValidatorFunction<T>,
    value: T,
    conf: ValidatorConfiguration
): Promise<ValidatorState<T>> {
    let validatorResult = validatorFunction(value, conf);
    if (typeof validatorResult === 'object' && validatorResult !== null) {
        // Promise
        return validatorResult.then(
            (newValue) => ({
                value: newValue ? newValue : value,
                failures: [],
            }),
            (failure) => ({
                value,
                failures: [failure],
            })
        );
    } else if (!validatorResult) {
        // Empty string or null should be valid
        return Promise.resolve({ value, failures: [] });
    }
    // String should be an error message
    return Promise.resolve({ value, failures: [validatorResult] });
};

const resolveValidatorList = function <T>(
    validators: ValidatorFunction<T>[],
    value: T,
    conf: ValidatorConfiguration
): Promise<ValidatorState<T>> {
    return validators.reduce((previousPromise, validator) => {
        return previousPromise.then(({ value, failures }) =>
            resolveValidator(validator, value, conf).then(
                ({ value: newValue, failures: additionalFailures }) => ({
                    value: newValue,
                    failures: failures.concat(additionalFailures),
                })
            )
        );
    }, Promise.resolve({ value, failures: [] } as ValidatorState<T>));
};

const _validate = function <T>(validator: Validator<T>, conf: ValidatorConfiguration) {
    return async function (testValue: unknown): Promise<SanitizedValue<T>> {
        if (typeof validator === 'object' && Array.isArray(validator) && typeof validator[0] === 'function') {
            // Array of functions mean a list of validators
            const { value, failures } = await resolveValidatorList(validator, testValue as T, conf);
            if (failures.length > 0) {
                throw failures;
            }
            return value;
        } else if (typeof validator === 'object' && Array.isArray(validator)) {
            // TODO: validate an array with the first item
        } else if (typeof validator === 'object') {
            // It is an object, all properties should be validated recursively
            if (typeof testValue !== 'object' || testValue === null) {
                throw `Field ${conf.name} should be an object.`;
            }

            let sanitizedObject: SanitizedObject<T> = {};
            let validationFailures: FailureType[] = [];
            for (let i in validator) {
                if (Object.prototype.hasOwnProperty.call(validator, i)) {
                    try {
                        const value = await _validate(validator[i], {
                            ...conf,
                            name: i,
                            path: conf.path.concat(i),
                            parent: testValue,
                        })((testValue as { [key: string]: unknown })[i]);
                        sanitizedObject[i] = value;
                    } catch (failures) {
                        if (Array.isArray(failures)) {
                            validationFailures = failures.reduce(
                                (previousFailures, failure) => previousFailures.concat(failure),
                                validationFailures
                            );
                        } else {
                            validationFailures = validationFailures.concat(failures);
                        }
                    }
                }
            }
            if (validationFailures.length > 0) {
                throw validationFailures;
            }
            return sanitizedObject;
        } else if (typeof validator === 'function') {
            // It is a function, validate with it
            const { value, failures } = await resolveValidator(validator, testValue as T, conf);
            if (failures.length > 0) {
                throw failures;
            }
            return value;
        } else {
            // Shouldn't go on here
            // TODO: handle errors / warnings
        }
    };
};

export const validate = function <T>(
    validator: Validator<T>,
    validateConf?: Partial<ValidatorConfiguration>
) {
    return async function (
        testObject: unknown,
        testConf?: Partial<ValidatorConfiguration>
    ): Promise<SanitizedValue<T>> {
        return _validate(validator, {
            name: 'object',
            path: [],
            original: testObject,
            parent: testObject,
            ...validateConf,
            ...testConf,
        })(testObject);
    };
};

export const validateCondition = <T>(
    condition: ConditionFunction<T>,
    errorMsg: FailureFunction<T> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<T> => {
    return async function (field, conf) {
        if (condition(field, conf)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export const validateRegex = (
    regex: RegExp,
    errorMsg: FailureFunction<string> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<string> => {
    return async function (field, conf) {
        if (regex.test(field)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};
