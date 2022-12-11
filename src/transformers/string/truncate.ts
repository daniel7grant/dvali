import { Success, SyncValidatorFunction } from '../../types.js';

const truncate =
    (n: number): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        return Success(n >= 0 ? value.substr(0, n) : value.substr(n));
    };

export default truncate;
