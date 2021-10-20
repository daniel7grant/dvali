import { Ignore, Success, ValidatorFunction } from '../../types';

const upper = (): ValidatorFunction<string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleUpperCase());
};

export default upper;
