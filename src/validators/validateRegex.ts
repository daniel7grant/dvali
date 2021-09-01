import { Failure, FailureFunction, Ignore, Success, ValidatorFunction } from '../types';

const validateRegex = (
    regex: RegExp,
    errorMsg: FailureFunction<string> = (_, { name }) => `Field ${name} format is invalid.`
): ValidatorFunction<string> => {
    return function (field, conf) {
        if (typeof field !== 'string') {
            return Ignore();
        }
        if (regex.test(field)) {
            return Success();
        } else {
            return Failure(errorMsg(field, conf));
        }
    };
};

export default validateRegex;
