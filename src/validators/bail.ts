import { ValidatorFunction, ValidatorState } from '../types.js';
import validate from '../validate.js';

const bail = <T>(validators: ValidatorFunction<T>[]): ValidatorFunction<T> => {
    if (!Array.isArray(validators)) {
        // If not an array is passed, simply continue validation
        return validate(validators);
    }
    return (value, conf) => {
        return validators
            .reduce<Promise<ValidatorState<T>>>((previousPromise, validator) => {
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
                return value;
            });
    };
};
export default bail;
