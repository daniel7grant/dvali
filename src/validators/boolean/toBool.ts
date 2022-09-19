import { Success, ValidatorFunctionAsync } from '../../types.js';

const toBool = (): ValidatorFunctionAsync<boolean> => (value) => {
    return Success(!!value);
};

export default toBool;
