import { Failure, FailureFunction, Success, SyncValidatorFunction } from '../types.js';

const validateRegex = (
    regex: RegExp,
    errorMsg: FailureFunction<string> = (_, { name }) => `Field ${name} format is invalid.`
): SyncValidatorFunction<string, string> => {
    return function (value, conf) {
        if (regex.test(value)) {
            return Success(value);
        } else {
            return Failure(errorMsg(value, conf));
        }
    };
};

export default validateRegex;
