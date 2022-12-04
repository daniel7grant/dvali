import {
    SyncValidatorFunction,
    SyncValidatorFunctionList,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorFunctionList,
    ValidatorState,
} from '../types.js';
import validate, { isPromise } from '../validate.js';

function bail<I, A, O, B>(
    validators: SyncValidatorFunctionList<I, A, O, B>
): (val: I, c: ValidatorConfiguration) => O;
function bail<I, A, O, B>(
    validators: ValidatorFunctionList<I, A, O, B>
): (val: I, c: ValidatorConfiguration) => Promise<O>;
function bail<I, A, O, B>(
    validators: ValidatorFunctionList<I, A, O, B>
): (val: I, c: ValidatorConfiguration) => O | Promise<O> {
    if (!Array.isArray(validators)) {
        // If not an array is passed, simply continue validation
        return validate(validators);
    }
    return (value, conf) => {
        const result = (validators as ValidatorFunction<unknown, unknown>[]).reduce<
            ValidatorState<unknown> | Promise<ValidatorState<unknown>>
        >(
            (previousState, validator) => {
                if (isPromise(previousState)) {
                    return previousState.then(({ value, failures }) => {
                        if (failures.length > 0) {
                            return previousState;
                        }
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
                if (previousState.failures.length > 0) {
                    return previousState;
                }
                const result = validator(value, conf);
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
    };
}
export default bail;
