import { SyncValidatorFunction } from '../../types.js';

const isUrl = (): SyncValidatorFunction<string, string> => (value, conf) => {
    try {
        new URL(value);
        return value;
    } catch {
        throw `Field ${conf.name} should be an url.`
    }
};
export default isUrl;
