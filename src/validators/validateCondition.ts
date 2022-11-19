import {
    Failure,
    FailureFunction,
    Success,
    ValidatorConfiguration,
    ValidatorFunction,
} from '../types.js';

interface ConditionFunction<I> {
    (v: I, conf: ValidatorConfiguration): boolean;
}

const validateCondition = <I, O>(
    condition: ConditionFunction<I>,
    errorMsg: FailureFunction<I> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<I, O> => {
    return function (field, conf) {
        if (condition(field, conf)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export default validateCondition;
