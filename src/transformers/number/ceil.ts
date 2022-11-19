import { Ignore, Success, ValidatorFunction } from '../../types.js';

const ceil = (): ValidatorFunction<unknown, number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.ceil(value));
};

export default ceil;
