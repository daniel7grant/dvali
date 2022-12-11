import validate, { hasNoPromise, isPromise } from '../validate.js';
import {
    Validator,
    ValidatorState,
    SyncValidator,
    ValidatorConfiguration,
    SyncValidatingFunction,
    AsyncValidatingFunction,
} from '../types.js';

function arrayOf<I, A, B, O>(
    validator: SyncValidator<I, A, B, O>
): SyncValidatingFunction<I[], O[]>;
function arrayOf<I, A, B, O>(validator: Validator<I, A, B, O>): AsyncValidatingFunction<I[], O[]>;
function arrayOf<I, A, B, O>(
    validator: Validator<I, A, B, O>
): (val: I[], c: ValidatorConfiguration) => O[] | Promise<O[]> {
    return (testValues, conf) => {
        // Array of one item should use that validation to every item in the array
        if (typeof testValues !== 'object' || !Array.isArray(testValues)) {
            throw `Field ${conf.name} should be an array.`;
        }

        const results = testValues.map<ValidatorState<O> | Promise<ValidatorState<O>>>(
            (testValue, i) => {
                try {
                    const result = validate(validator, {
                        ...conf,
                        name: `${conf.name}[${i}]`,
                        path: conf.path.concat(i.toString()),
                        parent: testValues,
                    })(testValue);

                    if (isPromise(result)) {
                        return result.then(
                            (value) => ({ value, failures: [] }),
                            (failures) => ({ value: testValue as any, failures })
                        );
                    }

                    // TODO: handles multiple failures
                    return { value: result, failures: [] };
                } catch (failure) {
                    return { value: testValue as any, failures: failure as string[] };
                }
            }
        );

        if (!hasNoPromise(results)) {
            return Promise.all(results).then((results) => {
                const failures = results.flatMap((result) => result.failures);
                if (failures.length > 0) {
                    throw failures;
                }
                return results.map(({ value }) => value);
            });
        }

        const failures = results.flatMap((result) => result.failures);
        if (failures.length > 0) {
            throw failures;
        }
        return results.map(({ value }) => value);
    };
}

export default arrayOf;
