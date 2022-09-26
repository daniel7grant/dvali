import { InferValidator, Success, Validator, ValidatorFunction } from '../types.js';
import validate from '../validate.js';

const either =
    <V extends Validator<unknown>>(validators: V[]): ValidatorFunction<InferValidator<V>> =>
        (value, conf) => {
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

export default either;
