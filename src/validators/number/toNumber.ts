import { Success, ValidatorFunctionAsync } from '../../types.js';

const toNumber = (): ValidatorFunctionAsync<number> => (value, conf) => {
    return Success(Number.parseFloat(value as any));
};

export default toNumber;
