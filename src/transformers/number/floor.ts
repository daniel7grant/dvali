import { Ignore, Success, ValidatorFunction } from '../../types.js';

const floor = (): ValidatorFunction<number> => (value, conf) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return Ignore();
    }
    return Success(Math.floor(value));
};

export default floor;
