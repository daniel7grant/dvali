import {
    SyncValidator,
    SyncValidatorFunctionInner,
    Validator,
    ValidatorConfiguration,
    ValidatorFunction,
    ValidatorState,
} from '../types.js';
import validate, { hasNoPromise, isPromise } from '../validate.js';

function either<O1, O2>(
    validators: [SyncValidator<any, any, any, O1>, SyncValidator<any, any, any, O2>]
): SyncValidatorFunctionInner<unknown, O1 | O2>;
function either<O1, O2>(
    validators: [Validator<any, any, any, O1>, Validator<any, any, any, O2>]
): ValidatorFunction<unknown, O1 | O2>;
function either<O1, O2>(
    validators: [Validator<any, any, any, O1>, Validator<any, any, any, O2>]
): (val: unknown, c: ValidatorConfiguration) => O1 | O2 | Promise<O1 | O2> {
    return (value, conf) => {
        const results = validators.map((validator) => {
            try {
                const result = validate(
                    validator as Validator<unknown, unknown, unknown, unknown>,
                    conf
                )(value, conf) as O1 | O2 | Promise<O1 | O2>;
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
