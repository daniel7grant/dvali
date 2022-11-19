import { Success, ValidatorFunction } from '../../types.js';

const toBool = (): ValidatorFunction<unknown, boolean> => (value) => {
    return Success(!!value);
};

export default toBool;
