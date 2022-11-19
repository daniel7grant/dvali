import {
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorFunctionList,
    ValidatorFunctionList1,
    ValidatorFunctionList2,
    ValidatorFunctionList3,
    ValidatorObject,
    ValidatorState,
} from './types.js';

const resolveValidatorList = function <I, A, B, O>(
    validators: ValidatorFunctionList<I, A, B, O>,
    value: any,
    conf: ValidatorConfiguration
): Promise<O> {
    return (validators as ValidatorFunction<unknown, unknown>[])
        .reduce<Promise<ValidatorState<unknown>>>((previousPromise, validator) => {
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
            return value as O;
        });
};

const resolveValidatorObject = function <O>(
    validator: ValidatorObject<O>,
    testValue: any,
    conf: ValidatorConfiguration
): Promise<O> {
    const keys = Object.keys(validator) as (keyof O)[];
    return Promise.all(
        keys.map<Promise<ValidatorState<[keyof O, O[keyof O]]>>>((i: keyof O) =>
            validate<any, any, any, O[keyof O]>(validator[i as keyof O], {
                ...conf,
                name: i as string,
                path: conf.path.concat(i as string),
                parent: testValue,
            })(testValue[i]).then(
                (value) => ({ value: [i, value], failures: [] }),
                (failures) => ({ value: [i, testValue[i]], failures })
            )
        )
    ).then((results) => {
        let sanitizedObject: { [key in keyof O]?: O[key] } = {};
        let validationFailures: string[] = [];

        results.forEach((result) => {
            if (result.failures.length > 0) {
                validationFailures = validationFailures.concat(result.failures);
            } else {
                if (typeof result.value[1] !== 'undefined') {
                    sanitizedObject[result.value[0]] = result.value[1];
                }
            }
        });

        if (validationFailures.length > 0) {
            throw validationFailures;
        }
        return sanitizedObject as O;
    });
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

export function validate<I, O>(v: ValidatorFunction<I, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>
export function validate<I, O>(v: ValidatorFunctionList1<I, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>
export function validate<I, A, O>(v: ValidatorFunctionList2<I, A, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>
export function validate<I, A, B, O>(v: ValidatorFunctionList3<I, A, B, O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>
export function validate<I, O>(v: ValidatorObject<O>, c?: Partial<ValidatorConfiguration>): (val: I, c?: Partial<ValidatorConfiguration>) => Promise<O>
export function validate<I, A, B, O>(validator: Validator<I, A, B, O>, validateConf?: Partial<ValidatorConfiguration>): (val: I, testConf?: Partial<ValidatorConfiguration>) => Promise<O> 
export function validate<I, A, B, O>(validator: Validator<I, A, B, O>, validateConf?: Partial<ValidatorConfiguration>): (val: I, testConf?: Partial<ValidatorConfiguration>) => Promise<O> {
    return function (testValue: any, testConf?: Partial<ValidatorConfiguration>): Promise<O> {
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
                return validator(testValue, conf)
                    .then((newValue) => (typeof newValue !== 'undefined' ? newValue : testValue))
                    .catch((failures) => {
                        if (Array.isArray(failures)) {
                            return Promise.reject(failures);
                        }
                        return Promise.reject([failures]);
                    });
            } catch (failures) {
                if (Array.isArray(failures)) {
                    return Promise.reject(failures);
                }
                return Promise.reject([failures]);
            }
        } else {
            // Shouldn't go on here
            throw new Error('Validator should be an array, object or function.');
        }
    };
};

export default validate;
