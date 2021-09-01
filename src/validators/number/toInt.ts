import { Success, ValidatorFunction } from '../../types';

const toInt = (): ValidatorFunction<number> => (value) => {
    return Success(Number.parseInt(value as any));
};

export default toInt;
