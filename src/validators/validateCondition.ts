import {
    FailureFunction,
    ValidatorConfiguration,
    AsyncValidatorFunction,
    SyncValidatorFunctionInner,
} from '../types.js';
import { isPromise } from '../validate.js';

interface SyncConditionFunction<T> {
    (v: unknown, conf: ValidatorConfiguration): boolean;
}
interface AsyncConditionFunction<T> {
    (v: unknown, conf: ValidatorConfiguration): Promise<boolean>;
}
type ConditionFunction<T> = SyncConditionFunction<T> | AsyncConditionFunction<T>;

function validateCondition<T>(
    condition: SyncConditionFunction<T>,
    errorMsg?: FailureFunction<unknown>
): SyncValidatorFunctionInner<unknown, T>;
function validateCondition<T>(
    condition: AsyncConditionFunction<T>,
    errorMsg?: FailureFunction<unknown>
): AsyncValidatorFunction<unknown, T>;
function validateCondition<T>(
    condition: ConditionFunction<T>,
    errorMsg: FailureFunction<unknown> = (_, { name }) => `Field ${name} format is invalid.`
): (value: unknown, conf: ValidatorConfiguration) => T | Promise<T> {
    return function (field, conf) {
        const result = condition(field, conf);
        if (isPromise(result)) {
            return result.then((result) => {
                if (result) {
                    return field as T;
                } else {
                    throw errorMsg(field, conf);
                }
            });
        }
        if (result) {
            return field as T;
        } else {
            throw errorMsg(field, conf);
        }
    };
}

export default validateCondition;
