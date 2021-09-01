import { Success, ValidatorFunction } from '../../types';

const toNumber = (): ValidatorFunction<number> => (value, conf) => {
    return Success(Number.parseFloat(value as any));
};

export default toNumber;
