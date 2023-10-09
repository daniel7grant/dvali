import { SyncValidatorFunction } from '../../types.js';

const normalize =
    (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): SyncValidatorFunction<string, string> =>
    (value, conf) => {
        return value.normalize(form);
    };

export default normalize;
