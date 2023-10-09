import {
    SyncValidatorFunctionInner,
    SyncValidator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorState,
    Validator,
} from '../types.js';
import validate, { hasNoPromise, isPromise } from '../validate.js';

function either<I1, I2, O1, O2>(
    validators: [SyncValidator<I1, O1>, SyncValidator<I2, O2>]
): SyncValidatorFunctionInner<unknown, O1 | O2>;
function either<I1, I2, O1, O2>(
    validators: [Validator<I1, O1>, Validator<I2, O2>]
): ValidatorFunction<unknown, O1 | O2>;
function either<I1, I2, O1, O2>(
    validators: [Validator<I1, O1>, Validator<I2, O2>]
): (val: unknown, c: ValidatorConfiguration) => O1 | O2 | Promise<O1 | O2> {
    return (value, conf) => {
        const results = validators.map((validator) => {
            try {
                const result = validate(validator as Validator<unknown, unknown>, conf)(
                    value,
                    conf
                ) as O1 | O2 | Promise<O1 | O2>;
                if (isPromise(result)) {
                    return result.then(
                        (value) =>
                            ({
                                value,
                                failures: [],
                            } as ValidatorState<O1 | O2>),
                        (failure) =>
                            ({
                                value,
                                failures: failure,
                            } as ValidatorState<O1 | O2>)
                    );
                }
                return {
                    value: result,
                    failures: [],
                } as ValidatorState<O1 | O2>;
            } catch (err) {
                return {
                    value,
                    failures: err,
                } as ValidatorState<O1 | O2>;
            }
        });

        if (!hasNoPromise(results)) {
            return Promise.all(results).then((results) => {
                const successfulResult = results.find((result) => result.failures.length === 0);
                if (typeof successfulResult === 'undefined') {
                    throw results.flatMap((result) => result.failures);
                }
                return successfulResult.value;
            });
        }

        const successfulResult = results.find((result) => result.failures.length === 0);
        if (typeof successfulResult === 'undefined') {
            throw results.flatMap((result) => result.failures);
        }
        return successfulResult.value;
    };
}

export default either;
