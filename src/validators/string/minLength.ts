import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const minLength =
    (min: number): ValidatorFunctionAsync<string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }

        if (value.length >= min) {
            return Success();
        }
        return Failure(`Field ${conf.name} length should be at least ${min} characters.`);
    };

export default minLength;
