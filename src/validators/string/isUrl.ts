import { Failure, Ignore, Success, ValidatorFunction } from '../../types';
import validateRegex from '../validateRegex';

const isUrl = (): ValidatorFunction<string> => async (value, conf) => {
    if (typeof value !== 'string'){
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
