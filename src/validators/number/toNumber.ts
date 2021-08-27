import { Success, ValidatorFunction } from '../../types';

const toNumber = (): ValidatorFunction<number> => async (value, conf) => {
    return Success(Number.parseFloat(value as any));
};

export default toNumber;
