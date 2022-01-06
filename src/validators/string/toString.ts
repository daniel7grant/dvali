import { Success, ValidatorFunction } from '../../types.js';

const toString = (): ValidatorFunction<string> => (value, conf) => {
    return Success('' + value);
};

export default toString;
