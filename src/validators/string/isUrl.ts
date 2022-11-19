import { Failure, Ignore, Success, ValidatorFunction } from '../../types.js';

const isUrl = (): ValidatorFunction<unknown, string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }

    try {
        const url = new URL(value);
        return Success();
    } catch {
        return Failure(`Field ${conf.name} should be an url.`);
    }
};
export default isUrl;
