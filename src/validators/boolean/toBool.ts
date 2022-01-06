import { Success, ValidatorFunction } from '../../types.js';

const toBool = (): ValidatorFunction<boolean> => (value) => {
    return Success(!!value);
};

export default toBool;
