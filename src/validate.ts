import {
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorObject,
    ValidatorState,
} from './types';

const resolveValidatorList = function <T>(
    validators: ValidatorFunction<T>[],
    value: any,
    conf: ValidatorConfiguration
): Promise<T> {
    return validators
        .reduce<Promise<ValidatorState<T>>>((previousPromise, validator) => {
            return previousPromise.then(({ value, failures }) =>
                validator(value, conf).then(
                    (newValue) => ({
                        value: typeof newValue !== 'undefined' ? newValue : value,
                        failures,
                    }),
                    (failure) => ({
                        value,
                        failures: failures.concat(failure),
                    })
                )
            );
        }, Promise.resolve({ value, failures: [] }))
        .then(({ value, failures }) => {
            if (failures.length > 0) {
                throw failures;
            }
            return value;
        });
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

const validate = function <T>(
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
            return resolveValidatorList(validator, testValue, conf);
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
                        validationFailures = failures.reduce(
                            (previousFailures: string[], failure: string[]) =>
                                previousFailures.concat(failure),
                            validationFailures
                        );
                    }
                }
            }
            if (validationFailures.length > 0) {
                throw validationFailures;
            }
            return sanitizedObject as T;
        } else if (isValidatorFunction(validator)) {
            // It is a function, validate with it
            return validator(testValue, conf)
                .then((newValue) => (typeof newValue !== 'undefined' ? newValue : testValue))
                .catch((failures) => {
                    if (Array.isArray(failures)) {
                        throw failures;
                    }
                    throw [failures];
                });
        } else {
            // Shouldn't go on here
            throw new Error('Validator should be an array, object or function.');
        }
    };
};

export default validate;
