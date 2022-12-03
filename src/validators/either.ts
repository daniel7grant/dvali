import { InferValidator, Success, Validator, ValidatorConfiguration } from '../types.js';
import validate from '../validate.js';

function either<V extends Validator<unknown, unknown, unknown, unknown>>(
    validators: V[]
): (val: unknown, c: ValidatorConfiguration) => InferValidator<V> | Promise<InferValidator<V>> {
    return (value, conf) => {
        return Promise.allSettled(
            validators.map(
                (validator) => validate(validator, conf)(value, conf) as InferValidator<V>
            )
        ).then((results) => {
            const fulfilledPromise = results.find(
                <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
                    result.status === 'fulfilled'
            );
            if (fulfilledPromise) {
                return Success(fulfilledPromise.value);
            }
            const rejectedPromises = results.filter(
                <T>(result: PromiseSettledResult<T>): result is PromiseRejectedResult =>
                    result.status === 'rejected'
            );
            throw rejectedPromises.flatMap((result) => result.reason);
        });
    };
}

export default either;
