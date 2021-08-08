import {
    Failure,
    FailureFunction,
    Success,
    ValidatorConfiguration,
    ValidatorFunction,
} from './dvali';

interface ConditionFunction<T> {
    (v: T, conf: ValidatorConfiguration): boolean;
}

const validateCondition = <T>(
    condition: ConditionFunction<T>,
    errorMsg: FailureFunction<T> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<T> => {
    return async function (field, conf) {
        if (condition(field, conf)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export default validateCondition;
