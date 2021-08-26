import { Success, ValidatorFunction } from '../../types';

const toBool = (): ValidatorFunction<boolean> => async (value) => {
    return Success(!!value);
};

export default toBool;
