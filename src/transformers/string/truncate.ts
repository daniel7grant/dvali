import { Ignore, Success, ValidatorFunction } from '../../types.js';

const truncate =
    (n: number): ValidatorFunction<unknown, string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }
        return Success(n >= 0 ? value.substr(0, n) : value.substr(n));
    };

export default truncate;
