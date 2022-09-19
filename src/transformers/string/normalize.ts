import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const normalize =
    (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): ValidatorFunctionAsync<string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }
        return Success(value.normalize(form));
    };

export default normalize;
