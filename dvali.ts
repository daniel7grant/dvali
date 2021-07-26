type SuccessType<T> = T | undefined | null;
type FailureType = string;

type UnknownObject = {
    [k: string]: unknown;
};

interface ValidationState<T> {
    value: T;
    failures: FailureType[];
}

interface ValidationConfiguration {
    name: string;
    path: string[];
    original: UnknownObject;
    parent: UnknownObject;
}

type ValidationProperty =
    | ValidationObject
    | ValidationObject[]
    | ValidationFunction<any>
    | ValidationFunction<any>[];

type ValidationObject = {
    [k: string]: ValidationProperty;
};

type TestObject<T> = {
    [key in keyof T]: any;
};

type ResultProperty<T> = ValidationResult<T> | ValidationState<any> | [ValidationState<any>];

type ValidationResult<T> = {
    [key in keyof T]: ResultProperty<T>;
};

export interface ValidationFunction<T = any> {
    (v: T, conf: ValidationConfiguration): Promise<SuccessType<T>>;
    // (v: T, conf: ValidationConfiguration): SuccessType<T>|FailureType;
}

interface FailureFunction<T> {
    (v: T, conf: ValidationConfiguration): FailureType;
}

interface ConditionFunction<T> {
    (v: T, conf: ValidationConfiguration): boolean;
}

const Success = <T>(x?: T): T | undefined => x;
const Failure = (e: string): never => {
    throw new Error(e);
};

function validateKey<T>(configuration: ValidationConfiguration) {
    return async function (
        { value, failures }: ValidationState<T>,
        validate: ValidationFunction<T>
    ) {
        try {
            const newValue = await validate(value, configuration);
            if (!newValue) {
                return { value, failures };
            } else {
                return { value: newValue, failures };
            }
        } catch (err) {
            return { value, failures: failures.concat(err.message) };
        }
    };
}

function _validateObject(validation: ValidationObject, conf: ValidationConfiguration) {
    return async (
        source: TestObject<typeof validation>
    ): Promise<ValidationResult<typeof validation>> => {
        let target: ValidationResult<typeof validation> = {};
        for (const i in validation) {
            const v: any = validation[i];
            switch (typeof v) {
                case 'object':
                    if (Array.isArray(v)) {
                        // Array of functions mean validators
                        if (typeof v[0] === 'function') {
                            target[i] = await v.reduce(
                                async (previousValue, validatorFunction) => {
                                    return previousValue.then((p: ValidationState<unknown>) =>
                                        validateKey({
                                            ...conf,
                                            name: i,
                                            path: conf.path.concat(i),
                                            parent: source,
                                        })(p, validatorFunction)
                                    );
                                },
                                Promise.resolve({
                                    value: source[i],
                                    failures: [],
                                }) as Promise<ValidationState<unknown>>
                            );
                            break;
                        }
                        else {
                            // TODO: handle array of objects / values
                        }
                    }

                    // If key does not exists we should return an error
                    if (typeof source[i] !== 'object') {
                        target[i] = {
                            value: source[i],
                            failures: [`Field ${i} should exist.`],
                        };
                        break;
                    }

                    // Otherwise, validate inside object / array
                    target[i] = await _validateObject(v, conf)(source[i]);
                    break;
                case 'function':
                    // One function should be called for validation
                    target[i] = await validateKey({
                        ...conf,
                        name: i,
                        path: conf.path.concat(i),
                        parent: source,
                    })({ value: source[i], failures: [] }, v);
                    break;
                default:
                    // numbers, strings and undefined / null shouldn't be here
                    break;
            }
        }
        return target;
    };
}

export function validateObject(validation: ValidationObject) {
    return async function (
        source: { [key in keyof typeof validation]: any }
    ): Promise<ValidationResult<typeof validation>> {
        return _validateObject(validation, {
            name: 'object',
            path: [],
            original: source,
            parent: source,
        })(source);
    };
}

export const validateCondition = <T>(
    condition: ConditionFunction<T>,
    errorMsg: FailureFunction<T> = (_, { name }) => `Field ${name} format is invalid.`
): ValidationFunction<T> => {
    return async function (field, conf) {
        if (condition(field, conf)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export const validateRegex = <T>(
    regex: RegExp,
    errorMsg: FailureFunction<T> = (_, { name }) => `Field ${name} format is invalid.`,
    typeErrorMsg: FailureFunction<T> = (_, { name }) => `Field ${name} should be a string.`
): ValidationFunction<T> => {
    return async function (field, conf) {
        if (typeof field !== 'string') {
            return Failure(typeErrorMsg(field, conf));
        }
        if (regex.test(field)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};
