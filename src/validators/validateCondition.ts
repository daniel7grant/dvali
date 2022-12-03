import {
    Failure,
    FailureFunction,
    Success,
    ValidatorConfiguration,
    SyncValidatorFunction,
} from '../types.js';

interface ConditionFunction<I> {
    (v: I, conf: ValidatorConfiguration): boolean;
}

const validateCondition = <I, O>(
    condition: ConditionFunction<I>,
    errorMsg: FailureFunction<I> = (_, { name }) => `Field ${name} format is invalid.`
): SyncValidatorFunction<I, O> => {
    return function (field, conf) {
        if (condition(field, conf)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export default validateCondition;
