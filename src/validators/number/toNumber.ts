import { Success, ValidatorFunction } from '../../types.js';

const toNumber = (): ValidatorFunction<unknown, number> => (value, conf) => {
    return Success(Number.parseFloat(value as any));
};

export default toNumber;
