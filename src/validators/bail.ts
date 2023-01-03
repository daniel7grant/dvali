import { SyncValidatorFunctionList, ValidatorConfiguration, ValidatorFunction, ValidatorFunctionList, ValidatorState } from '../types.js';
import validate, { isPromise } from '../validate.js';

// TODO: replace this with parallel validation
function bail<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validators: SyncValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>): (val: I, c: ValidatorConfiguration) => O;
function bail<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validators: ValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>): (val: I, c: ValidatorConfiguration) => Promise<O>;
function bail<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>(validators: ValidatorFunctionList<I, A, B, C, D, E, F, G, H, J, K, L, M, P, Q, R, S, T, U, V, W, X, Y, Z, O>): (val: I, c: ValidatorConfiguration) => O | Promise<O> {
    if (!Array.isArray(validators)) {
        // If not an array is passed, simply continue validation
        return validate(validators);
    }
    return (value, conf) => {
        const result = (validators as ValidatorFunction<unknown, unknown>[]).reduce<ValidatorState<unknown> | Promise<ValidatorState<unknown>>>(
            (previousState, validator) => {
                if (isPromise(previousState)) {
                    return previousState.then(({ value, failures }) => {
                        if (failures.length > 0) {
                            return previousState;
                        }
                        try {
                            const result = validator(value, conf);
                            if (isPromise(result)) {
                                return result.then(
                                    (newValue) => ({
                                        value: newValue,
                                        failures,
                                    }),
                                    (failure) => ({
                                        value,
                                        failures: failures.concat(failure),
                                    })
                                );
                            }
                            return {
                                value: result,
                                failures: failures,
                            };
                        } catch (err) {
                            return {
                                value,
                                failures: failures.concat(err as string[]),
                            };
                        }
                    });
                }
                if (previousState.failures.length > 0) {
                    return previousState;
                }
                try {
                    const result = validator(value, conf);
                    if (isPromise(result)) {
                        return result.then(
                            (newValue) => ({
                                value: newValue,
                                failures: previousState.failures,
                            }),
                            (failure) => ({
                                value,
                                failures: previousState.failures.concat(failure),
                            })
                        );
                    }
                    return {
                        value: result,
                        failures: previousState.failures,
                    };
                } catch (err) {
                    return {
                        value,
                        failures: previousState.failures.concat(err as string[]),
                    };
                }
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

        if (result.failures.length > 0) {
            throw result.failures;
        }
        return result.value as O;
    };
}
export default bail;
