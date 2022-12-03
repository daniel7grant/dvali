import {
    SyncValidatorFunction,
    SyncValidatorFunctionList,
    ValidatorConfiguration,
    ValidatorState,
} from '../types.js';
import validate, { isPromise } from '../validate.js';

const bail = <I, A, O, B>(
    validators: SyncValidatorFunctionList<I, A, O, B>
): ((val: I, c: ValidatorConfiguration) => O | Promise<O>) => {
    if (!Array.isArray(validators)) {
        // If not an array is passed, simply continue validation
        return validate(validators);
    }
    return (value, conf) => {
        return (validators as SyncValidatorFunction<unknown, unknown>[])
            .reduce<ValidatorState<unknown> | Promise<ValidatorState<unknown>>>(
                (previousPromise, validator) => {
                    return previousPromise.then(({ value, failures }) => {
                        if (failures.length > 0) {
                            return { value, failures }; // Short-circuit for any error
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
                        return result;
                    });
                },
                { value, failures: [] }
            )
            .then(({ value, failures }) => {
                if (failures.length > 0) {
                    throw failures;
                }
                return value as O;
            });
    };
};
export default bail;
