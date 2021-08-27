import { Success, ValidatorFunction } from '../../types';

const toInt = (): ValidatorFunction<number> => async (value) => {
    return Success(Number.parseInt(value as any));
};

export default toInt;
