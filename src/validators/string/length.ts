import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const length =
    (n: number): ValidatorFunctionAsync<string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }

        if (value.length === n) {
            return Success();
        }
        return Failure(`Field ${conf.name} length should be exactly ${n} characters.`);
    };

export default length;
