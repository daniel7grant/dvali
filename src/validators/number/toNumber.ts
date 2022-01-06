import { Success, ValidatorFunction } from '../../types.js';

const toNumber = (): ValidatorFunction<number> => (value, conf) => {
    return Success(Number.parseFloat(value as any));
};

export default toNumber;
