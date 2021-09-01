import { Success, ValidatorFunction } from '../../types';

const toBool = (): ValidatorFunction<boolean> => (value) => {
    return Success(!!value);
};

export default toBool;
