import { Ignore, Success, SyncValidatorFunction } from '../../types.js';

const normalize =
    (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'):SyncValidatorFunction<unknown, string> =>
    (value, conf) => {
        if (typeof value !== 'string') {
            return Ignore();
        }
        return Success(value.normalize(form));
    };

export default normalize;
