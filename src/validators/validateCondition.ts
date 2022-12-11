import {
    Failure,
    FailureFunction,
    Success,
    ValidatorConfiguration,
    SyncValidatorFunction,
    AsyncValidatorFunction,
} from '../types.js';
import { isPromise } from '../validate.js';

interface SyncConditionFunction<O> {
    (v: unknown, conf: ValidatorConfiguration): boolean;
}

interface AsyncConditionFunction<O> {
    (v: unknown, conf: ValidatorConfiguration): Promise<boolean>;
}

type ConditionFunction<O> = SyncConditionFunction<O> | AsyncConditionFunction<O>;

function validateCondition<O>(
    condition: SyncConditionFunction<O>,
    errorMsg?: FailureFunction<unknown>
): SyncValidatorFunction<unknown, O>;
function validateCondition<O>(
    condition: AsyncConditionFunction<O>,
    errorMsg?: FailureFunction<unknown>
): AsyncValidatorFunction<unknown, O>;
function validateCondition<O>(
    condition: ConditionFunction<O>,
    errorMsg: FailureFunction<unknown> = (_, { name }) => `Field ${name} format is invalid.`
): (field: unknown, conf: ValidatorConfiguration) => O | undefined | Promise<O | undefined> {
    return function (field, conf) {
        const result = condition(field, conf);
        if (isPromise(result)) {
            return result.then((result) => {
                if (result) {
                    return Success();
                } else {
                    return Failure(errorMsg(field, conf));
                }
            });
        }
        if (result) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
}

export default validateCondition;
