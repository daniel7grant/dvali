import { InferValidator, Validator, ValidatorConfiguration } from '../types.js';
import validate, { hasNoPromise } from '../validate.js';

function either<V extends Validator<unknown, unknown, unknown, unknown>>(
    validators: V[]
): (val: unknown, c: ValidatorConfiguration) => InferValidator<V>;
function either<V extends Validator<unknown, unknown, unknown, unknown>>(
    validators: V[]
): (val: unknown, c: ValidatorConfiguration) => Promise<InferValidator<V>>;
function either<V extends Validator<unknown, unknown, unknown, unknown>>(
    validators: V[]
): (val: unknown, c: ValidatorConfiguration) => InferValidator<V> | Promise<InferValidator<V>> {
    return (value, conf) => {
        try {
            const results = validators.map((validator) => {
                return validate(validator, conf)(value, conf) as
                    | InferValidator<V>
                    | Promise<InferValidator<V>>;
            });

            if (!hasNoPromise(results)) {
                return Promise.allSettled(results).then((results) => {
                    const fulfilledPromise = results.find(
                        <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
                            result.status === 'fulfilled'
                    );
                    if (fulfilledPromise) {
                        return fulfilledPromise.value;
                    }
                    const rejectedPromises = results.filter(
                        <T>(result: PromiseSettledResult<T>): result is PromiseRejectedResult =>
                            result.status === 'rejected'
                    );
                    throw rejectedPromises.flatMap((result) => result.reason);
                });
            }
            return value as InferValidator<V>;
        } catch (err) {
            throw err;
        }
    };
}

export default either;
