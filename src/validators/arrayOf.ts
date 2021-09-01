import validate from '../validate';
import { Validator, ValidatorFunction, ValidatorState } from '../types';

const arrayOf =
    <T>(validator: Validator<T>): ValidatorFunction<T[]> =>
    (testValues, conf) => {
        // Array of one item should use that validation to every item in the array
        if (typeof testValues !== 'object' || !Array.isArray(testValues)) {
            throw `Field ${conf.name} should be an array.`;
        }

        return Promise.all(
            testValues.map<Promise<ValidatorState<T>>>((testValue, i) =>
                validate(validator, {
                    ...conf,
                    name: `${conf.name}[${i}]`,
                    path: conf.path.concat(i.toString()),
                    parent: testValues,
                })(testValue).then(
                    (value) => ({ value, failures: [] }),
                    (failures) => ({ value: testValue, failures })
                )
            )
        ).then((results) => {
            let validationFailures = results.reduce<string[]>(
                (previousFailures, { failures }) => previousFailures.concat(failures),
                []
            );
            if (validationFailures.length > 0) {
                throw validationFailures;
            }

            return results.map(({ value }) => value) as T[];
        });
    };

export default arrayOf;
