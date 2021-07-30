export type SuccessType<T> = T | null | undefined;
export type FailureType = string;

export interface ValidatorState<T> {
    value: T;
    failures: FailureType[];
}

export interface ValidatorConfiguration {
    name: string;
    path: string[];
    original: TestObject;
    parent: TestObject;
}

export interface ValidatorFunction<T = any> {
    (value: T, conf: ValidatorConfiguration): Promise<SuccessType<T>>;
}

export type ValidatorProp<T> = ValidatorObject<T> | ValidatorFunction<T>[] | ValidatorFunction<T>;

export type ValidatorObject<T> = {
    [key in keyof T]: ValidatorProp<T[key]>;
};

export type TestObject = {
    [key: string]: unknown;
};

export type SanitizedObject<T> = {
    [key in keyof T]?: T[key];
};

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

const _validateObject = function <T>(
    validatorObject: ValidatorObject<T>,
    conf: ValidatorConfiguration
) {
    return async function (testObject: TestObject): Promise<SanitizedObject<typeof testObject>> {
        let sanitizedObject: SanitizedObject<typeof testObject> = {};
        let validationFailures: FailureType[] = [];
        for (const i in validatorObject) {
            if (Object.prototype.hasOwnProperty.call(validatorObject, i)) {
                if (typeof validatorObject[i] === 'object' && Array.isArray(validatorObject[i])) {
                    // Array
                    const validators = validatorObject[
                        i
                    ] as unknown as ValidatorFunction<unknown>[];
                    const { value, failures } = await resolveValidatorList(
                        validators,
                        testObject[i],
                        { ...conf, name: i, path: conf.path.concat(i) }
                    );
                    sanitizedObject[i] = value;
                    validationFailures = validationFailures.concat(failures);
                } else if (typeof validatorObject[i] === 'object') {
                    // Object
                    const validator = validatorObject[i] as unknown as ValidatorObject<unknown>;
                    try {
                        const value = await _validateObject(validator, {
                            ...conf,
                            name: i,
                            path: conf.path.concat(i),
                        })(testObject[i] as TestObject);
                        sanitizedObject[i] = value;
                    } catch (failures) {
                        validationFailures = validationFailures.concat(failures);
                    }
                } else if (typeof validatorObject[i] === 'function') {
                    // Function
                    const validator = validatorObject[i] as unknown as ValidatorFunction<unknown>;
                    const { value, failures } = await resolveValidator(validator, testObject[i], {
                        ...conf,
                        name: i,
                        path: conf.path.concat(i),
                    });
                    sanitizedObject[i] = value;
                    validationFailures = validationFailures.concat(failures);
                } else {
                    // Shouldn't go on here
                }
            }
        }
        if (validationFailures.length > 0) {
            throw validationFailures;
        }
        return sanitizedObject;
    };
};

export const validateObject = function <T>(validatorObject: ValidatorObject<T>, conf?: Partial<ValidatorConfiguration>) {
    return async function (testObject: TestObject): Promise<SanitizedObject<typeof testObject>> {
        return _validateObject(validatorObject, {
            name: 'object',
            path: [],
            original: testObject,
            parent: testObject,
            ...conf,
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
