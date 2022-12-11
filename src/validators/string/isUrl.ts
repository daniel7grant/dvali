import { Failure, Success, SyncValidatorFunction } from '../../types.js';

const isUrl = (): SyncValidatorFunction<string, string> => (value, conf) => {
    try {
        new URL(value);
        return Success(value);
    } catch {
        return Failure(`Field ${conf.name} should be an url.`);
    }
};
export default isUrl;
