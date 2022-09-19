import { Failure, Ignore, Success, ValidatorFunctionAsync } from '../../types.js';
import validateRegex from '../validateRegex.js';

const isUrl = (): ValidatorFunctionAsync<string> => (value, conf) => {
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
