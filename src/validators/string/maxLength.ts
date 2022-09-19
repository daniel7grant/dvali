import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const maxLength =
    (max: number): ValidatorFunctionAsync<string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }

        if (value.length <= max) {
            return Success();
        }
        return Failure(`Field ${conf.name} length should be at most ${max} characters.`);
    };

export default maxLength;
