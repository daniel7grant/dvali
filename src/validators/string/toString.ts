import { Success, ValidatorFunction } from '../../types';

const toString = (): ValidatorFunction<string> => async (value, conf) => {
    return Success("" + value);
};

export default toString;
