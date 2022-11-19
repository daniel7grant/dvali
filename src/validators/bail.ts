import { ValidatorFunction, ValidatorFunctionList, ValidatorState } from '../types.js';
import validate from '../validate.js';

const bail = <I, A, O, B>(validators: ValidatorFunctionList<I, A, O, B>): ValidatorFunction<unknown, O> => {
    if (!Array.isArray(validators)) {
        // If not an array is passed, simply continue validation
        return validate(validators);
    }
    return (value, conf) => {
        return (validators as ValidatorFunction<unknown, unknown>[])
            .reduce<Promise<ValidatorState<unknown>>>((previousPromise, validator) => {
                return previousPromise.then(({ value, failures }) =>
                    failures.length > 0
                        ? { value, failures } // Short-circuit for any error
                        : validator(value, conf).then(
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
};
export default bail;
