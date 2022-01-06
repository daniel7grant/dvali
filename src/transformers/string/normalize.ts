import { Ignore, Success, ValidatorFunction } from '../../types.js';

const normalize =
    (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): ValidatorFunction<string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }
        return Success(value.normalize(form));
    };

export default normalize;
