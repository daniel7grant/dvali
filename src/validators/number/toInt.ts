import { Success, ValidatorFunctionAsync } from '../../types.js';

const toInt = (): ValidatorFunctionAsync<number> => (value) => {
    return Success(Number.parseInt(value as any));
};

export default toInt;
