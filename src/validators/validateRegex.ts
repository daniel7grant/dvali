import { FailureFunction, SyncValidatorFunction } from '../types.js';

const validateRegex = (
    regex: RegExp,
    errorMsg: FailureFunction<string> = (_, { name }) => `Field ${name} format is invalid.`
): SyncValidatorFunction<string, string> => {
    return function (value, conf) {
        if (regex.test(value)) {
            return value;
        } else {
            throw errorMsg(value, conf)
        }
    };
};

export default validateRegex;
