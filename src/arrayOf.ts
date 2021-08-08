import { validate, Validator, ValidatorFunction } from './dvali';

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
