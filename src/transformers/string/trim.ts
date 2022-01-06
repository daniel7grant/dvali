import { Ignore, Success, ValidatorFunction } from '../../types.js';

const trim = (): ValidatorFunction<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.trim());
};

export default trim;
