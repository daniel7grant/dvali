import {
    Failure,
    FailureFunction,
    Success,
    ValidatorConfiguration,
    ValidatorFunction,
} from '../types.js';

interface ConditionFunction<T> {
    (v: T, conf: ValidatorConfiguration): boolean;
}

const validateCondition = <T>(
    condition: ConditionFunction<T>,
    errorMsg: FailureFunction<T> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<T> => {
    return function (field, conf) {
        if (condition(field, conf)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export default validateCondition;
