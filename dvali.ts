export interface ValidatorState<T> {
    value: T;
    failures: string[];
}

export interface ValidatorConfiguration {
    name: string;
    path: string[];
    original: any;
    parent: any;
}

export interface ValidatorFunction<T = any> {
    (value: T, conf: ValidatorConfiguration): Promise<T | undefined>;
}

export type ValidatorObject<T> = {
    [key in keyof T]: Validator<T[key]>;
};

export type Validator<T> = ValidatorObject<T> | ValidatorFunction<T>[] | ValidatorFunction<T>;

interface FailureFunction<T> {
    (v: T, conf: ValidatorConfiguration): string;
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
    value: any,
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
    value: any,
    conf: ValidatorConfiguration
): Promise<ValidatorState<T>> {
    return validators.reduce<Promise<ValidatorState<T>>>((previousPromise, validator) => {
        return previousPromise.then(({ value, failures }) =>
            resolveValidator(validator, value, conf).then(
                ({ value: newValue, failures: additionalFailures }) => ({
                    value: newValue,
                    failures: failures.concat(additionalFailures),
                })
            )
        );
    }, Promise.resolve({ value, failures: [] }));
};

const isValidatorFunctionList = <T>(
    validator: Validator<T>
): validator is ValidatorFunction<T>[] => {
    return typeof validator === 'object' && Array.isArray(validator);
};

const isValidatorObject = <T>(validator: Validator<T>): validator is ValidatorObject<T> => {
    return typeof validator === 'object' && !Array.isArray(validator);
};

const isValidatorFunction = <T>(validator: Validator<T>): validator is ValidatorFunction<T> => {
    return typeof validator === 'function';
};

export const validate = function <T>(
    validator: Validator<T>,
    validateConf?: Partial<ValidatorConfiguration>
) {
    return async function (testValue: any, testConf?: Partial<ValidatorConfiguration>): Promise<T> {
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
            const { value, failures } = await resolveValidatorList(validator, testValue, conf);
            if (failures.length > 0) {
                throw failures;
            }
            return value;
            // } else if (isValidatorArray(validator)) {
            // Array validation should use arrayOf instead
        } else if (isValidatorObject(validator)) {
            // It is an object, all properties should be validated recursively
            if (typeof testValue !== 'object' || testValue === null) {
                throw `Field ${conf.name} should be an object.`;
            }

            let sanitizedObject: { [key in keyof T]?: T[key] } = {};
            let validationFailures: string[] = [];
            for (let i in validator) {
                if (Object.prototype.hasOwnProperty.call(validator, i)) {
                    try {
                        const value = await validate(validator[i], {
                            ...conf,
                            name: i,
                            path: conf.path.concat(i),
                            parent: testValue,
                        })(testValue[i]);
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
            return sanitizedObject as T;
        } else if (isValidatorFunction(validator)) {
            // It is a function, validate with it
            const { value, failures } = await resolveValidator(validator, testValue, conf);
            if (failures.length > 0) {
                throw failures;
            }
            return value;
        } else {
            // Shouldn't go on here
            throw new Error('Validator should be an array, object or function.');
        }
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

export const arrayOf = <T>(validator: Validator<T>): ValidatorFunction<T[]> => {
    return async function name(testValue, conf) {
        // Array of one item should use that validation to every item in the array
        if (typeof testValue !== 'object' || !Array.isArray(testValue)) {
            throw `Field ${conf.name} should be an array.`;
        }

        let sanitizedArray: T[] = [];
        let validationFailures: string[] = [];
        for (let i = 0; i < testValue.length; i++) {
            try {
                const value = await validate(validator, {
                    ...conf,
                    name: `${conf.name}[${i}]`,
                    path: conf.path.concat(i.toString()),
                    parent: testValue,
                })(testValue[i]);
                sanitizedArray[i] = value;
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

        if (validationFailures.length > 0) {
            throw validationFailures;
        }

        return sanitizedArray as T[];
    };
};
