import { Ignore, Success, ValidatorFunction } from '../../types';

const trim = (): ValidatorFunction<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.trim());
};

export default trim;
