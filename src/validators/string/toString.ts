import { Success, ValidatorFunction } from '../../types.js';

const toString = (): ValidatorFunction<unknown, string> => (value, conf) => {
    return Success('' + value);
};

export default toString;
