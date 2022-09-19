import { Ignore, Success, ValidatorFunctionAsync } from '../../types.js';

const trim = (): ValidatorFunctionAsync<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.trim());
};

export default trim;
