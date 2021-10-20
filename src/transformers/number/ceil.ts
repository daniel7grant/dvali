import { Ignore, Success, ValidatorFunction } from '../../types';

const ceil = (): ValidatorFunction<number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.ceil(value));
};

export default ceil;
