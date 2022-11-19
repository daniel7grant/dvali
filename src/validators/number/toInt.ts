import { Success, ValidatorFunction } from '../../types.js';

const toInt = (): ValidatorFunction<unknown, number> => (value) => {
    return Success(Number.parseInt(value as any));
};

export default toInt;
