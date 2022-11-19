import { Ignore, Success, ValidatorFunction } from '../../types.js';

const lower = (): ValidatorFunction<unknown, string> => (value, conf) => {
    if (typeof value !== 'string') {
        return Ignore();
    }
    return Success(value.toLocaleLowerCase());
};

export default lower;
