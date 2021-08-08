import { Failure, FailureFunction, Success, ValidatorFunction } from './dvali';

export const validateRegex = (
    regex: RegExp,
    errorMsg: FailureFunction<string> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<string> => {
    return async function (field, conf) {
        if (regex.test(field)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};
